// OpenMediaLogic API TypeScript SDK
// Generated SDK for OpenMediaLogic API
// API client class
class OpenMediaLogicClient {
    baseUrl;
    token = null;
    constructor(baseUrl = "http://localhost") {
        this.baseUrl = baseUrl;
    }
    setToken(token = null) {
        this.token = token;
    }
    // Authentication methods
    async login(credentials) {
        const response = await this.request("POST", "/api/auth/login", credentials);
        this.token = response.access_token;
        return response;
    }
    async logout() {
        const response = await this.request("POST", "/api/auth/logout");
        this.token = null;
        return response;
    }
    async refreshToken() {
        const response = await this.request("POST", "/api/auth/refresh");
        this.token = response.data.access_token;
        return response.data;
    }
    async getCurrentUser() {
        const response = await this.request("POST", "/api/auth/me");
        return response.data;
    }
    // Advertiser methods
    async getAdvertisers(params) {
        return await this.request("GET", "/api/advertisers", undefined, params);
    }
    // Agency methods
    async getAgencies(params) {
        return await this.request("GET", "/api/agencies", undefined, params);
    }
    // Block methods
    async getBlockById(id) {
        const response = await this.request("GET", `/api/blocks/${id}`);
        return response.data;
    }
    async addSpotToBlock(blockId, data, force) {
        const response = await this.request("POST", `/api/blocks/${blockId}/spots`, data, { force: force ? "true" : undefined });
        return response.data;
    }
    async deleteSpotFromBlock(blockId, spotId) {
        const response = await this.request("DELETE", `/api/blocks/${blockId}/spots/${spotId}`);
        return response.data;
    }
    // BlockType methods
    async getBlockTypes() {
        const response = await this.request("GET", "/api/block_types");
        return response.data;
    }
    // BrandClass methods
    async getBrandClasses(params) {
        return await this.request("GET", "/api/brand_classes", undefined, params);
    }
    // Brand methods
    async getBrands(params) {
        return await this.request("GET", "/api/brands", undefined, params);
    }
    // BrandGroup methods
    async getBrandGroups(brandClassId) {
        const response = await this.request("GET", "/api/brand_groups", undefined, { brand_class_id: brandClassId });
        return response.data;
    }
    // Channel methods
    async getChannels(params) {
        return await this.request("GET", "/api/channels", undefined, params);
    }
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
    // ChannelCompany methods
    async getChannelCompanies(params) {
        return await this.request("GET", "/api/channel_companies", undefined, params);
    }
    // Commercial methods
    async getCommercials(params) {
        return await this.request("GET", "/api/commercials", undefined, params);
    }
    // CommercialType methods
    async getCommercialTypes() {
        const response = await this.request("GET", "/api/commercial_types");
        return response.data;
    }
    // CommercialVersionType methods
    async getCommercialVersionTypes(params) {
        return await this.request("GET", "/api/commercial_version_types", undefined, params);
    }
    // MeasurementCompany methods
    async getMeasurementCompanies(params) {
        return await this.request("GET", "/api/measurement_companies", undefined, params);
    }
    // Mediaplan methods
    async getMediaplans(params) {
        return await this.request("GET", "/api/mediaplans", undefined, params);
    }
    // Order methods
    async getOrders(params) {
        return await this.request("GET", "/api/orders", undefined, params);
    }
    // PlacementType methods
    async getPlacementTypes() {
        const response = await this.request("GET", "/api/placement_types");
        return response.data;
    }
    // Project methods
    async getProjects(params) {
        return await this.request("GET", "/api/projects", undefined, params);
    }
    // Saleshouse methods
    async getSaleshouses(params) {
        return await this.request("GET", "/api/saleshouses", undefined, params);
    }
    // TargetAudience methods
    async getTargetAudiences(params) {
        return await this.request("GET", "/api/target_audiences", undefined, params);
    }
    // Year methods
    async getYears() {
        const response = await this.request("GET", "/api/years");
        return response.data;
    }
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
export default OpenMediaLogicClient;
//# sourceMappingURL=sdk.js.map