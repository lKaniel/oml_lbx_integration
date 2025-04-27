/**
 * OpenMediaLogic API TypeScript SDK
 * Generated SDK for OpenMediaLogic API for working with TV advertising platforms.
 * Provides access to projects, orders, mediaplans, and booking functionality.
 */

import { FilterParams } from "./types/params/filterParams.js";
import { SortParams } from "./types/params/sortParams.js";
import { IncludeParams } from "./types/params/includeParams.js";
import { FieldParams } from "./types/params/fieldParams.js";
import { Advertiser } from "./types/advertiser.js";
import { Agency } from "./types/agency.js";
import { Brand } from "./types/brand.js";
import { BrandClass } from "./types/brandClass.js";
import { BrandGroup } from "./types/brandGroup.js";
import { Block } from "./types/block.js";
import { BlockType } from "./types/blockType.js";
import { Channel } from "./types/channel.js";
import { ChannelCompany } from "./types/channelCompany.js";
import { Commercial } from "./types/commercial.js";
import { CommercialType } from "./types/commercialType.js";
import { CommercialVersionType } from "./types/commercialVersionType.js";
import { MeasurementCompany } from "./types/measurementCompany.js";
import { Mediaplan } from "./types/mediaplan.js";
import { Order } from "./types/order.js";
import { PlacementType } from "./types/placementType.js";
import { Project } from "./types/project.js";
import { Saleshouse } from "./types/saleshouse.js";
import { TargetAudience } from "./types/targetAudience.js";
import { User } from "./types/user.js";
import { Year } from "./types/year.js";
import { PaginationParams } from "./types/params/paginationParams.js";

export interface ApiResponse<T> {
    data: T;
    pagination?: {
        page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface TokenResource {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface UserLoginRequest {
    login: string;
    password: string;
}

type RequestParams = Record<string, string | number | boolean | undefined>;

/**
 * OpenMediaLogic API client class
 * Main client for interacting with the OpenMediaLogic API
 */
class OpenMediaLogicClient {
    private baseUrl: string;
    private token: string | null = null;

    /**
     * Creates a new instance of the OpenMediaLogic API client
     * @param baseUrl - Base URL of the OpenMediaLogic API (defaults to "http://localhost")
     */
    constructor(baseUrl: string = "http://localhost") {
        this.baseUrl = baseUrl;
    }

    /**
     * Sets the authentication token for API requests
     * @param token - JWT token to use for authentication, or null to clear the token
     */
    setToken(token: string | null = null): void {
        this.token = token;
    }

    /**
     * Authenticates a user with the OpenMediaLogic API
     * @param credentials - User login credentials (username and password)
     * @returns Authentication token information
     */
    async login(credentials: UserLoginRequest): Promise<TokenResource> {
        const response = await this.request<TokenResource>("POST", "/api/auth/login", credentials);
        this.token = response.access_token;
        return response;
    }

    /**
     * Logs out the current user and clears the authentication token
     * @returns Message indicating successful logout
     */
    async logout(): Promise<{ message: string }> {
        const response = await this.request<{ message: string }>("POST", "/api/auth/logout");
        this.token = null;
        return response;
    }

    /**
     * Refreshes the current authentication token
     * @returns New authentication token information
     */
    async refreshToken(): Promise<TokenResource> {
        const response = await this.request<ApiResponse<TokenResource>>(
            "POST",
            "/api/auth/refresh"
        );
        this.token = response.data.access_token;
        return response.data;
    }

    /**
     * Retrieves information about the currently authenticated user
     * @returns Information about the current user
     */
    async getCurrentUser(): Promise<User> {
        const response = await this.request<ApiResponse<User>>("POST", "/api/auth/me");
        return response.data;
    }

    /**
     * Retrieves a list of advertisers
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of advertisers and pagination information
     */
    async getAdvertisers(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Advertiser[]>> {
        return await this.request<ApiResponse<Advertiser[]>>(
            "GET",
            "/api/advertisers",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of agencies
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of agencies and pagination information
     */
    async getAgencies(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Agency[]>> {
        return await this.request<ApiResponse<Agency[]>>("GET", "/api/agencies", undefined, params);
    }

    /**
     * Retrieves detailed information about a specific block by ID
     * @param id - Block ID to retrieve
     * @returns Block information
     */
    async getBlockById(id: number): Promise<Block> {
        const response = await this.request<ApiResponse<Block>>("GET", `/api/blocks/${id}`);
        return response.data;
    }

    /**
     * Adds a spot (commercial placement) to a specific block
     * @param blockId - ID of the block to add the spot to
     * @param data - Spot data including commercial ID, mediaplan ID, and optional position/priority
     * @param force - Optional flag to force placement even if validation fails
     * @returns Updated block information with the new spot
     */
    async addSpotToBlock(
        blockId: number,
        data: {
            commercial_id: number;
            mediaplan_id: number;
            position?: string;
            priority?: number;
            auction_coeff?: number;
        },
        force?: boolean
    ): Promise<Block> {
        const response = await this.request<ApiResponse<Block>>(
            "POST",
            `/api/blocks/${blockId}/spots`,
            data,
            { force: force ? "true" : undefined }
        );
        return response.data;
    }

    /**
     * Removes a spot from a block
     * @param blockId - ID of the block containing the spot
     * @param spotId - ID of the spot to remove
     * @returns Updated block information without the removed spot
     */
    async deleteSpotFromBlock(blockId: number, spotId: number): Promise<Block> {
        const response = await this.request<ApiResponse<Block>>(
            "DELETE",
            `/api/blocks/${blockId}/spots/${spotId}`
        );
        return response.data;
    }

    /**
     * Retrieves a list of available block types
     * @returns List of block types
     */
    async getBlockTypes(): Promise<BlockType[]> {
        const response = await this.request<ApiResponse<BlockType[]>>("GET", "/api/block_types");
        return response.data;
    }

    /**
     * Retrieves a list of brand classes
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of brand classes and pagination information
     */
    async getBrandClasses(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<BrandClass[]>> {
        return await this.request<ApiResponse<BrandClass[]>>(
            "GET",
            "/api/brand_classes",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of brands
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of brands and pagination information
     */
    async getBrands(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Brand[]>> {
        return await this.request<ApiResponse<Brand[]>>("GET", "/api/brands", undefined, params);
    }

    /**
     * Retrieves a list of brand groups, optionally filtered by brand class
     * @param brandClassId - Optional brand class ID to filter groups by
     * @returns List of brand groups
     */
    async getBrandGroups(brandClassId?: number): Promise<BrandGroup[]> {
        const response = await this.request<ApiResponse<BrandGroup[]>>(
            "GET",
            "/api/brand_groups",
            undefined,
            { brand_class_id: brandClassId }
        );
        return response.data;
    }

    /**
     * Retrieves a list of TV channels
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of channels and pagination information
     */
    async getChannels(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Channel[]>> {
        return await this.request<ApiResponse<Channel[]>>(
            "GET",
            "/api/channels",
            undefined,
            params
        );
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
    async getChannelBooking(
        channelId: number,
        dateStartAt: string,
        dateEndAt?: string,
        commercialTypeId?: number,
        blockTypeId?: number,
        projectId?: number,
        orderId?: number,
        mediaplanId?: number
    ): Promise<any> {
        return await this.request<any>("GET", `/api/channels/${channelId}/booking`, undefined, {
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
    async getChannelCompanies(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<ChannelCompany[]>> {
        return await this.request<ApiResponse<ChannelCompany[]>>(
            "GET",
            "/api/channel_companies",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of commercials (ad spots)
     * @param params - Optional parameters for pagination, filtering, sorting, and including relations
     * @returns List of commercials and pagination information
     */
    async getCommercials(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Commercial[]>> {
        return await this.request<ApiResponse<Commercial[]>>(
            "GET",
            "/api/commercials",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of commercial types
     * @returns List of commercial types
     */
    async getCommercialTypes(): Promise<CommercialType[]> {
        const response = await this.request<ApiResponse<CommercialType[]>>(
            "GET",
            "/api/commercial_types"
        );
        return response.data;
    }

    /**
     * Retrieves a list of commercial version types
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of commercial version types and pagination information
     */
    async getCommercialVersionTypes(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<CommercialVersionType[]>> {
        return await this.request<ApiResponse<CommercialVersionType[]>>(
            "GET",
            "/api/commercial_version_types",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of measurement companies (agencies that provide audience measurement data)
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of measurement companies and pagination information
     */
    async getMeasurementCompanies(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<MeasurementCompany[]>> {
        return await this.request<ApiResponse<MeasurementCompany[]>>(
            "GET",
            "/api/measurement_companies",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of mediaplans
     * @param params - Optional parameters for pagination, filtering, sorting, and including relations
     * @returns List of mediaplans and pagination information
     */
    async getMediaplans(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Mediaplan[]>> {
        return await this.request<ApiResponse<Mediaplan[]>>(
            "GET",
            "/api/mediaplans",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of orders
     * @param params - Optional parameters for pagination, filtering, sorting, and including relations
     * @returns List of orders and pagination information
     */
    async getOrders(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Order[]>> {
        return await this.request<ApiResponse<Order[]>>("GET", "/api/orders", undefined, params);
    }

    /**
     * Retrieves a list of placement types
     * @returns List of placement types
     */
    async getPlacementTypes(): Promise<PlacementType[]> {
        const response = await this.request<ApiResponse<PlacementType[]>>(
            "GET",
            "/api/placement_types"
        );
        return response.data;
    }

    /**
     * Retrieves a list of advertising projects
     * @param params - Optional parameters for pagination, filtering, sorting, and including relations
     * @returns List of projects and pagination information
     */
    async getProjects(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Project[]>> {
        return await this.request<ApiResponse<Project[]>>(
            "GET",
            "/api/projects",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of saleshouses (advertising sales organizations)
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of saleshouses and pagination information
     */
    async getSaleshouses(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Saleshouse[]>> {
        return await this.request<ApiResponse<Saleshouse[]>>(
            "GET",
            "/api/saleshouses",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of target audiences for ad targeting
     * @param params - Optional parameters for pagination, filtering, sorting, including relations, and selecting fields
     * @returns List of target audiences and pagination information
     */
    async getTargetAudiences(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<TargetAudience[]>> {
        return await this.request<ApiResponse<TargetAudience[]>>(
            "GET",
            "/api/target_audiences",
            undefined,
            params
        );
    }

    /**
     * Retrieves a list of years available in the system
     * @returns List of years
     */
    async getYears(): Promise<Year[]> {
        const response = await this.request<ApiResponse<Year[]>>("GET", "/api/years");
        return response.data;
    }

    /**
     * Generates headers for API requests, including authentication if token is set
     * @returns Headers object with content type and optional authentication
     * @private
     */
    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
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
    private async request<T>(
        method: string,
        endpoint: string,
        data?: unknown,
        params?: RequestParams
    ): Promise<T> {
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
        const options: RequestInit = {
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
        return (await response.json()) as T;
    }
}

export { OpenMediaLogicClient };
