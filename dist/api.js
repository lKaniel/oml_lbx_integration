const serializeQueryParam = (key, value) => {
    if (value && typeof value === "object") {
        return [key, JSON.stringify(value)];
    }
    return [key, String(value)];
};
const buildUrl = (path, params = [], query = {}) => {
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
            }
            else {
                if (Array.isArray(value)) {
                    for (const item of value) {
                        const [paramKey, paramValue] = serializeQueryParam(key, item);
                        searchParams.append(`${paramKey}[]`, paramValue);
                    }
                }
                else {
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
const customFetch = async (path, options = {}) => {
    const { params = [], query = {}, body, headers = {}, expectResponse = true, ...fetchOptions } = options;
    const url = buildUrl(path, params, query);
    const defaultHeaders = {
        "Content-Type": "application/json",
    };
    const requestOptions = {
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
            return null; // Return void for no-response requests
        }
        if (!response.ok) {
            const errorResponse = (await response.json());
            throw new Error(errorResponse.message
                ? errorResponse.message
                : `HTTP error! status: ${response.status}`);
        }
        // Return null for 204 No Content
        if (response.status === 204) {
            return null;
        }
        // Check if the response should be returned as a blob
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/octet-stream") ||
            contentType?.includes("application/pdf") ||
            contentType?.includes("image/")) {
            return response.blob();
        }
        // For JSON responses
        if (contentType?.includes("application/json")) {
            const jsonData = await response.json();
            return jsonData; // Return the actual data, not the Response object
        }
        // For text responses
        if (contentType?.includes("text/")) {
            return response.text();
        }
        // Default to JSON if content-type is not specified
        return response.json();
    }
    catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};
const api = {
    get: ({ path, params, query = {}, options = {}, expectResponse = true, }) => {
        return customFetch(path, {
            method: "GET",
            params,
            query,
            expectResponse,
            ...options,
        });
    },
    post: ({ path, params, body, query = {}, options = {}, expectResponse = true, }) => {
        return customFetch(path, {
            method: "POST",
            params,
            query,
            body,
            expectResponse,
            ...options,
        });
    },
    put: ({ path, params, body, query = {}, options = {}, expectResponse = true, }) => {
        return customFetch(path, {
            method: "PUT",
            params,
            query,
            body,
            expectResponse,
            ...options,
        });
    },
    patch: ({ path, params, body, query = {}, options = {}, expectResponse = true, }) => {
        return customFetch(path, {
            method: "PATCH",
            params,
            query,
            body,
            expectResponse,
            ...options,
        });
    },
    delete: ({ path, params, body, query = {}, options = {}, expectResponse = true, }) => {
        return customFetch(path, {
            method: "DELETE",
            params,
            query,
            body,
            expectResponse,
            ...options,
        });
    },
    sendOnly: {
        post: ({ path, params, body, query = {}, options = {}, }) => {
            return customFetch(path, {
                method: "POST",
                params,
                query,
                body,
                expectResponse: false,
                ...options,
            });
        },
        put: ({ path, params, body, query = {}, options = {}, }) => {
            return customFetch(path, {
                method: "PUT",
                params,
                query,
                body,
                expectResponse: false,
                ...options,
            });
        },
        patch: ({ path, params, body, query = {}, options = {}, }) => {
            return customFetch(path, {
                method: "PATCH",
                params,
                query,
                body,
                expectResponse: false,
                ...options,
            });
        },
        delete: ({ path, params, body, query = {}, options = {}, }) => {
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
    downloadFile: async ({ url, filename, options = {}, }) => {
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
//# sourceMappingURL=api.js.map