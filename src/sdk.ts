// OpenMediaLogic API TypeScript SDK
// Generated SDK for OpenMediaLogic API

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

// API client class
class OpenMediaLogicClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string = "http://localhost") {
        this.baseUrl = baseUrl;
    }

    setToken(token: string | null = null): void {
        this.token = token;
    }

    // Authentication methods
    async login(credentials: UserLoginRequest): Promise<TokenResource> {
        const response = await this.request<TokenResource>("POST", "/api/auth/login", credentials);
        this.token = response.access_token;
        return response;
    }

    async logout(): Promise<{ message: string }> {
        const response = await this.request<{ message: string }>("POST", "/api/auth/logout");
        this.token = null;
        return response;
    }

    async refreshToken(): Promise<TokenResource> {
        const response = await this.request<ApiResponse<TokenResource>>(
            "POST",
            "/api/auth/refresh"
        );
        this.token = response.data.access_token;
        return response.data;
    }

    async getCurrentUser(): Promise<User> {
        const response = await this.request<ApiResponse<User>>("POST", "/api/auth/me");
        return response.data;
    }

    // Advertiser methods
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

    // Agency methods
    async getAgencies(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Agency[]>> {
        return await this.request<ApiResponse<Agency[]>>("GET", "/api/agencies", undefined, params);
    }

    // Block methods
    async getBlockById(id: number): Promise<Block> {
        const response = await this.request<ApiResponse<Block>>("GET", `/api/blocks/${id}`);
        return response.data;
    }

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

    async deleteSpotFromBlock(blockId: number, spotId: number): Promise<Block> {
        const response = await this.request<ApiResponse<Block>>(
            "DELETE",
            `/api/blocks/${blockId}/spots/${spotId}`
        );
        return response.data;
    }

    // BlockType methods
    async getBlockTypes(): Promise<BlockType[]> {
        const response = await this.request<ApiResponse<BlockType[]>>("GET", "/api/block_types");
        return response.data;
    }

    // BrandClass methods
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

    // Brand methods
    async getBrands(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Brand[]>> {
        return await this.request<ApiResponse<Brand[]>>("GET", "/api/brands", undefined, params);
    }

    // BrandGroup methods
    async getBrandGroups(brandClassId?: number): Promise<BrandGroup[]> {
        const response = await this.request<ApiResponse<BrandGroup[]>>(
            "GET",
            "/api/brand_groups",
            undefined,
            { brand_class_id: brandClassId }
        );
        return response.data;
    }

    // Channel methods
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

    // ChannelCompany methods
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

    // Commercial methods
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

    // CommercialType methods
    async getCommercialTypes(): Promise<CommercialType[]> {
        const response = await this.request<ApiResponse<CommercialType[]>>(
            "GET",
            "/api/commercial_types"
        );
        return response.data;
    }

    // CommercialVersionType methods
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

    // MeasurementCompany methods
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

    // Mediaplan methods
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

    // Order methods
    async getOrders(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Order[]>> {
        return await this.request<ApiResponse<Order[]>>("GET", "/api/orders", undefined, params);
    }

    // PlacementType methods
    async getPlacementTypes(): Promise<PlacementType[]> {
        const response = await this.request<ApiResponse<PlacementType[]>>(
            "GET",
            "/api/placement_types"
        );
        return response.data;
    }

    // Project methods
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

    // Saleshouse methods
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

    // TargetAudience methods
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

    // Year methods
    async getYears(): Promise<Year[]> {
        const response = await this.request<ApiResponse<Year[]>>("GET", "/api/years");
        return response.data;
    }

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
