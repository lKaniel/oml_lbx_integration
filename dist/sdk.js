/**
 * OpenMediaLogic API TypeScript SDK
 * Generated SDK for OpenMediaLogic API for working with TV advertising platforms.
 * Provides access to projects, orders, mediaplans, and booking functionality.
 */
/**
 * OpenMediaLogic API client class
 * Main client for interacting with the OpenMediaLogic API
 */
class OpenMediaLogicClient {
    baseUrl;
    token = null;
    /**
     * Creates a new instance of the OpenMediaLogic API client
     * @param baseUrl - Base URL of the OpenMediaLogic API (defaults to "http://localhost")
     */
    constructor(baseUrl = "http://localhost") {
        this.baseUrl = baseUrl;
    }
    /**
     * Sets the authentication token for API requests
     * @param token - JWT token to use for authentication, or null to clear the token
     */
    setToken(token = null) {
        this.token = token;
    }
    /**
     * Authenticates a user with the OpenMediaLogic API
     * @param credentials - User login credentials (username and password)
     * @returns Authentication token information
     */
    async login(credentials) {
        const response = await this.request("POST", "/api/auth/login", credentials);
        this.token = response.access_token;
        return response;
    }
    /**
     * Logs out the current user and clears the authentication token
     * @returns Message indicating successful logout
     */
    async logout() {
        const response = await this.request("POST", "/api/auth/logout");
        this.token = null;
        return response;
    }
    /**
     * Refreshes the current authentication token
     * @returns New authentication token information
     */
    async refreshToken() {
        const response = await this.request("POST", "/api/auth/refresh");
        this.token = response.data.access_token;
        return response.data;
    }
    /**
     * Retrieves information about the currently authenticated user
     * @returns Information about the current user
     */
    async getCurrentUser() {
        const response = await this.request("POST", "/api/auth/me");
        return response.data;
    }
    /**
     * Retrieves a list of advertisers
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of advertisers and pagination information
     */
    async getAdvertisers(params) {
        return await this.request("GET", "/api/advertisers", undefined, params);
    }
    /**
     * Retrieves a list of agencies
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of agencies and pagination information
     */
    async getAgencies(params) {
        return await this.request("GET", "/api/agencies", undefined, params);
    }
    /**
     * Retrieves detailed information about a specific block by ID
     * @param id - Block ID to retrieve
     * @returns Block information
     */
    async getBlockById(id) {
        const response = await this.request("GET", `/api/blocks/${id}`);
        return response.data;
    }
    /**
     * Adds a spot (commercial placement) to a specific block
     * @param blockId - ID of the block to add the spot to
     * @param data - Spot data including commercial ID, mediaplan ID, and optional position/priority
     * @param force - Optional flag to force placement even if validation fails
     * @returns Updated block information with the new spot
     */
    async addSpotToBlock(blockId, data, force) {
        const response = await this.request("POST", `/api/blocks/${blockId}/spots`, data, { force: force ? "true" : undefined });
        return response.data;
    }
    /**
     * Removes a spot from a block
     * @param blockId - ID of the block containing the spot
     * @param spotId - ID of the spot to remove
     * @returns Updated block information without the removed spot
     */
    async deleteSpotFromBlock(blockId, spotId) {
        const response = await this.request("DELETE", `/api/blocks/${blockId}/spots/${spotId}`);
        return response.data;
    }
    /**
     * Retrieves a list of available block types
     * @returns List of block types
     */
    async getBlockTypes() {
        const response = await this.request("GET", "/api/block_types");
        return response.data;
    }
    /**
     * Retrieves a list of brand classes
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of brand classes and pagination information
     */
    async getBrandClasses(params) {
        return await this.request("GET", "/api/brand_classes", undefined, params);
    }
    /**
     * Retrieves a list of brands
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of brands and pagination information
     */
    async getBrands(params) {
        return await this.request("GET", "/api/brands", undefined, params);
    }
    /**
     * Retrieves a list of brand groups, optionally filtered by brand class
     * @param brandClassId - Optional brand class ID to filter groups by
     * @returns List of brand groups
     */
    async getBrandGroups(brandClassId) {
        const response = await this.request("GET", "/api/brand_groups", undefined, { brand_class_id: brandClassId });
        return response.data;
    }
    /**
     * Retrieves a list of TV channels
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of channels and pagination information
     */
    async getChannels(params) {
        return await this.request("GET", "/api/channels", undefined, params);
    }
    /**
     * Retrieves booking grid data for a specific channel and date range
     * @param channelId - ID of the channel to get booking data for
     * @param dateStartAt - Start date for booking data (YYYY-MM-DD)
     * @param dateEndAt - Optional end date for booking data (YYYY-MM-DD)
     * @param commercialTypeId - Optional commercial type ID to filter by
     * @param blockTypeId - Optional block type ID to filter by
     * @param projectId - Optional project ID to filter by
     * @param orderId - Optional order ID to filter by
     * @param mediaplanId - Optional mediaplan ID to filter by
     * @returns Booking grid data with blocks and available time slots
     */
    async getChannelBooking(channelId, dateStartAt, dateEndAt, commercialTypeId, blockTypeId, projectId, orderId, mediaplanId) {
        return await this.request("GET", `/api/channels/${channelId}/booking`, undefined, {
            date_start_at: dateStartAt,
            date_end_at: dateEndAt,
            commercial_type_id: commercialTypeId,
            block_type_id: blockTypeId,
            project_id: projectId,
            order_id: orderId,
            mediaplan_id: mediaplanId,
        });
    }
    /**
     * Retrieves a list of channel companies (broadcasters)
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of channel companies and pagination information
     */
    async getChannelCompanies(params) {
        return await this.request("GET", "/api/channel_companies", undefined, params);
    }
    /**
     * Retrieves a list of commercials (ad spots)
     * @param params - Optional parameters for pagination, filtering, sorting, and including relations
     * @returns List of commercials and pagination information
     */
    async getCommercials(params) {
        return await this.request("GET", "/api/commercials", undefined, params);
    }
    /**
     * Retrieves a list of commercial types
     * @returns List of commercial types
     */
    async getCommercialTypes() {
        const response = await this.request("GET", "/api/commercial_types");
        return response.data;
    }
    /**
     * Retrieves a list of commercial version types
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of commercial version types and pagination information
     */
    async getCommercialVersionTypes(params) {
        return await this.request("GET", "/api/commercial_version_types", undefined, params);
    }
    /**
     * Retrieves a list of measurement companies (agencies that provide audience measurement data)
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of measurement companies and pagination information
     */
    async getMeasurementCompanies(params) {
        return await this.request("GET", "/api/measurement_companies", undefined, params);
    }
    /**
     * Retrieves a list of mediaplans
     * @param params - Optional parameters for pagination, filtering, sorting, and including relations
     * @returns List of mediaplans and pagination information
     */
    async getMediaplans(params) {
        return await this.request("GET", "/api/mediaplans", undefined, params);
    }
    /**
     * Retrieves a list of orders
     * @param params - Optional parameters for pagination, filtering, sorting, and including relations
     * @returns List of orders and pagination information
     */
    async getOrders(params) {
        return await this.request("GET", "/api/orders", undefined, params);
    }
    /**
     * Retrieves a list of placement types
     * @returns List of placement types
     */
    async getPlacementTypes() {
        const response = await this.request("GET", "/api/placement_types");
        return response.data;
    }
    /**
     * Retrieves a list of advertising projects
     * @param params - Optional parameters for pagination, filtering, sorting, and including relations
     * @returns List of projects and pagination information
     */
    async getProjects(params) {
        return await this.request("GET", "/api/projects", undefined, params);
    }
    /**
     * Retrieves a list of saleshouses (advertising sales organizations)
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of saleshouses and pagination information
     */
    async getSaleshouses(params) {
        return await this.request("GET", "/api/saleshouses", undefined, params);
    }
    /**
     * Retrieves a list of target audiences for ad targeting
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of target audiences and pagination information
     */
    async getTargetAudiences(params) {
        return await this.request("GET", "/api/target_audiences", undefined, params);
    }
    /**
     * Retrieves a list of years available in the system
     * @returns List of years
     */
    async getYears() {
        const response = await this.request("GET", "/api/years");
        return response.data;
    }
    /**
     * Generates headers for API requests, including authentication if token is set
     * @returns Headers object with content type and optional authentication
     * @private
     */
    getHeaders() {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }
        return headers;
    }
    /**
     * Makes an HTTP request to the OpenMediaLogic API
     * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
     * @param endpoint - API endpoint path
     * @param data - Optional data to send in the request body
     * @param params - Optional query parameters
     * @returns Parsed API response
     * @private
     */
    async request(method, endpoint, data, params) {
        // Build URL with query parameters
        const url = new URL(endpoint, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    url.searchParams.append(key, String(value));
                }
            });
        }
        // Configure fetch options
        const options = {
            method,
            headers: this.getHeaders(),
        };
        // Add body for POST, PUT, PATCH requests
        if (data && ["POST", "PUT", "PATCH"].includes(method)) {
            options.body = JSON.stringify(data);
        }
        // Execute request
        const response = await fetch(url.toString(), options);
        // Handle non-successful responses
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        // Parse JSON response
        return (await response.json());
    }
}
export { OpenMediaLogicClient };
//# sourceMappingURL=sdk.js.map