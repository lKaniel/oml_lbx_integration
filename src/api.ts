type RequestOptions = RequestInit & {
    params?: string[];
    query?: Record<string, any>;
    body?: any;
    expectResponse?: boolean; // New option to determine if response processing is needed
};

type ApiResponse<T> = Promise<T>; // Modified to include void for no-response cases

const serializeQueryParam = (key: string, value: any): [string, string] => {
    if (value && typeof value === "object") {
        return [key, JSON.stringify(value)];
    }

    return [key, String(value)];
};

const buildUrl = (path: string, params: string[] = [], query: Record<string, any> = {}) => {
    let fullPath = path;

    for (const param of params) {
        fullPath += `/${param}`;
    }

    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (typeof value === "object" && !Array.isArray(value)) {
                // Handle nested objects
                Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                    if (nestedValue !== undefined && nestedValue !== null) {
                        searchParams.append(`${key}[${nestedKey}]`, String(nestedValue));
                    }
                });
            } else {
                if (Array.isArray(value)) {
                    for (const item of value) {
                        const [paramKey, paramValue] = serializeQueryParam(key, item);
                        searchParams.append(`${paramKey}[]`, paramValue);
                    }
                } else {
                    const [paramKey, paramValue] = serializeQueryParam(key, value);
                    searchParams.append(paramKey, paramValue);
                }
            }
        }
    });

    const queryString = searchParams.toString();
    if (queryString) {
        fullPath += `?${queryString}`;
    }

    return fullPath;
};

const customFetch = async <T>(path: string, options: RequestOptions = {}): ApiResponse<T> => {
    const {
        params = [],
        query = {},
        body,
        headers = {},
        expectResponse = true,
        ...fetchOptions
    } = options;

    const url = buildUrl(path, params, query);

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    const requestOptions: RequestInit = {
        ...fetchOptions,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, requestOptions);

        // If we don't expect a response, just check for errors and return
        if (!expectResponse) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return null as T; // Return void for no-response requests
        }

        if (!response.ok) {
            const errorResponse: Record<string, string> = (await response.json()) as Record<
                string,
                string
            >;
            throw new Error(
                errorResponse.message
                    ? errorResponse.message
                    : `HTTP error! status: ${response.status}`
            );
        }

        // Return null for 204 No Content
        if (response.status === 204) {
            return null as T;
        }

        // Check if the response should be returned as a blob
        const contentType = response.headers.get("content-type");
        if (
            contentType?.includes("application/octet-stream") ||
            contentType?.includes("application/pdf") ||
            contentType?.includes("image/")
        ) {
            return response.blob() as Promise<T>;
        }

        // For JSON responses
        if (contentType?.includes("application/json")) {
            const jsonData = await response.json();
            return jsonData as T; // Return the actual data, not the Response object
        }

        // For text responses
        if (contentType?.includes("text/")) {
            return response.text() as Promise<T>;
        }

        // Default to JSON if content-type is not specified
        return response.json() as Promise<T>;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};

const api = {
    get: <T>({
        path,
        params,
        query = {},
        options = {},
        expectResponse = true,
    }: {
        path: string;
        params?: string[];
        query?: Record<string, any>;
        options?: Omit<RequestOptions, "method" | "body" | "expectResponse">;
        expectResponse?: boolean;
    }): ApiResponse<T> => {
        return customFetch<T>(path, {
            method: "GET",
            params,
            query,
            expectResponse,
            ...options,
        });
    },

    post: <T>({
        path,
        params,
        body,
        query = {},
        options = {},
        expectResponse = true,
    }: {
        path: string;
        params?: string[];
        body?: any;
        query?: Record<string, any>;
        options?: Omit<RequestOptions, "method" | "expectResponse">;
        expectResponse?: boolean;
    }): ApiResponse<T> => {
        return customFetch<T>(path, {
            method: "POST",
            params,
            query,
            body,
            expectResponse,
            ...options,
        });
    },

    put: <T>({
        path,
        params,
        body,
        query = {},
        options = {},
        expectResponse = true,
    }: {
        path: string;
        params?: string[];
        body?: any;
        query?: Record<string, any>;
        options?: Omit<RequestOptions, "method" | "expectResponse">;
        expectResponse?: boolean;
    }): ApiResponse<T> => {
        return customFetch<T>(path, {
            method: "PUT",
            params,
            query,
            body,
            expectResponse,
            ...options,
        });
    },

    patch: <T>({
        path,
        params,
        body,
        query = {},
        options = {},
        expectResponse = true,
    }: {
        path: string;
        params?: string[];
        body?: any;
        query?: Record<string, any>;
        options?: Omit<RequestOptions, "method" | "expectResponse">;
        expectResponse?: boolean;
    }): ApiResponse<T> => {
        return customFetch<T>(path, {
            method: "PATCH",
            params,
            query,
            body,
            expectResponse,
            ...options,
        });
    },

    delete: <T>({
        path,
        params,
        body,
        query = {},
        options = {},
        expectResponse = true,
    }: {
        path: string;
        params?: string[];
        body?: any;
        query?: Record<string, any>;
        options?: Omit<RequestOptions, "method" | "expectResponse">;
        expectResponse?: boolean;
    }): ApiResponse<T> => {
        return customFetch<T>(path, {
            method: "DELETE",
            params,
            query,
            body,
            expectResponse,
            ...options,
        });
    },
    sendOnly: {
        post: ({
            path,
            params,
            body,
            query = {},
            options = {},
        }: {
            path: string;
            params?: string[];
            body?: any;
            query?: Record<string, any>;
            options?: Omit<RequestOptions, "method" | "expectResponse">;
        }): Promise<void> => {
            return customFetch(path, {
                method: "POST",
                params,
                query,
                body,
                expectResponse: false,
                ...options,
            });
        },

        put: ({
            path,
            params,
            body,
            query = {},
            options = {},
        }: {
            path: string;
            params?: string[];
            body?: any;
            query?: Record<string, any>;
            options?: Omit<RequestOptions, "method" | "expectResponse">;
        }): Promise<void> => {
            return customFetch(path, {
                method: "PUT",
                params,
                query,
                body,
                expectResponse: false,
                ...options,
            });
        },

        patch: ({
            path,
            params,
            body,
            query = {},
            options = {},
        }: {
            path: string;
            params?: string[];
            body?: any;
            query?: Record<string, any>;
            options?: Omit<RequestOptions, "method" | "expectResponse">;
        }): Promise<void> => {
            return customFetch(path, {
                method: "PATCH",
                params,
                query,
                body,
                expectResponse: false,
                ...options,
            });
        },

        delete: ({
            path,
            params,
            body,
            query = {},
            options = {},
        }: {
            path: string;
            params?: string[];
            body?: any;
            query?: Record<string, any>;
            options?: Omit<RequestOptions, "method" | "expectResponse">;
        }): Promise<void> => {
            return customFetch(path, {
                method: "DELETE",
                params,
                query,
                body,
                expectResponse: false,
                ...options,
            });
        },
    },

    downloadFile: async ({
        url,
        filename,
        options = {},
    }: {
        url: string;
        filename: string;
        options?: Omit<RequestOptions, "method">;
    }): Promise<void> => {
        const response = await fetch(url, options);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    },
};

export default api;
