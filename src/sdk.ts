// OpenMediaLogic API TypeScript SDK
// Generated SDK for OpenMediaLogic API

import axios, { type AxiosInstance } from "axios";

// Base API types
export interface PaginationParams {
    page?: number;
    per_page?: number;
}

export interface FilterParams {
    [key: string]: any;
}

export interface SortParams {
    sort?: string;
}

export interface IncludeParams {
    include?: string;
}

export interface FieldParams {
    fields?: {
        [key: string]: string;
    };
}

export interface ApiResponse<T> {
    data: T;
    pagination?: {
        page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

// Model interfaces
export interface Advertiser {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    agencies?: Agency[];
    brands?: Brand[];
    projects?: Project[];
    retro_bonus_scales?: RetroBonusScale[] | null;
}

export interface Agency {
    id?: number;
    name: string;
    advertisers?: Advertiser[];
    projects?: Project[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    allow_mass_copy?: boolean;
}

export interface TokenResource {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface Brand {
    id?: number;
    advertiser_id: number;
    advertiser?: Advertiser;
    brand_group_id?: number;
    brand_group?: BrandGroup;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    commercials?: Commercial[];
}

export interface BrandClass {
    id?: number;
    name: string;
    brand_groups?: BrandGroup[];
}

export interface BrandGroup {
    id?: number;
    name: string;
    brand_class_id: number;
    brand_class?: BrandClass;
}

export interface Block {
    id?: number;
    channel_id: number;
    program_release_id?: number | null;
    commercial_type_id: number;
    block_type_id?: number;
    date_start_at: string;
    time_start_at: string;
    date_end_at: string;
    time_end_at: string;
    duration: number;
    actual_duration?: number;
    pullable_duration?: number;
    low_priority_duration?: number;
    broadcast_day?: string;
    start_interval?: number;
    end_interval?: number;
    auction_step_coeff?: number;
    is_fixed_price?: boolean;
    created_at?: string;
    updated_at?: string;
    is_calculating?: number;
    channel?: Channel;
    program_release?: ProgramRelease;
    commercial_type?: CommercialType;
    block_type?: BlockType;
    spots?: Spot[] | null;
    block_prices?: BlockPrice[] | null;
}

export interface BlockType {
    id: number;
    name: string;
}

export interface BlockPrice {
    block_id?: number | null;
    target_audience_id?: number | null;
    price: number;
    Block?: Block | null;
    target_audience?: TargetAudience | null;
}

export interface Channel {
    id?: number;
    saleshouse_id?: number;
    saleshouse?: Saleshouse;
    channel_company_id?: number;
    channel_company?: ChannelCompany;
    main_channel_id?: number;
    main_channel?: Channel;
    name: string;
    broadcasting_copy?: boolean;
    is_visible?: boolean;
    channel_settings?: {
        [year: string]: ChannelSetting;
    };
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    commercials?: Commercial[];
    grps?: Grp[];
    discounts?: ChannelDiscount[];
}

export interface ChannelCompany {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export interface ChannelSetting {
    id?: number;
    year_id?: number;
    channel_id?: number;
    saleshouse_id?: number;
    saleshouse?: Saleshouse;
    holding_id?: number;
    holding?: Holding;
    base_target_audience_id?: number;
    base_target_audience?: TargetAudience;
    closing_datetimes?: {
        [key: string]: {
            start_interval: number;
            time?: string;
            days: number[];
        };
    };
    prime_time_datetimes?: Array<{
        start_at?: string;
        end_at?: string;
        start_interval: number;
        duration: number;
        end_interval: number;
        days: number[];
    }>;
    channel_setting_prime_time?: ChannelSettingPrimeTime[];
    sh_quota_percent_prime_time?: number;
    sh_quota_percent_off_prime_time?: number;
    default_plan_grp?: number;
    default_fact_grp?: number;
    saleshouse_commission?: number;
    auction_step_coeff?: number;
    start_interval?: number;
    is_tv_network?: boolean;
}

export interface ChannelSettingPrimeTime {
    id?: number;
    channel_setting_id: number;
    day_of_week: number;
    time_start_at: string;
    time_end_at: string;
    start_interval?: number;
    end_interval?: number;
    duration?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Commercial {
    id?: number;
    commercial_version_type_id: number;
    commercial_type_id: number;
    brand_id: number;
    co_brand_id?: number;
    co_branding_discount?: number;
    external_id?: number | null;
    name: string;
    duration: number;
    legal_before_at: string;
    url: string | null;
    status?: number;
    is_visible?: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    commercial_version_type?: CommercialVersionType | null;
    commercial_type?: CommercialType | null;
    Brand?: Brand | null;
    co_brand?: Brand | null;
    mediaplans?: Mediaplan[];
    channels?: Channel[];
    is_approved?: boolean | null;
    approve_comment?: string | null;
}

export interface CommercialType {
    id: number;
    name: string;
    projects?: Project[];
    commercials?: Commercial[];
}

export interface CommercialVersionType {
    id?: number;
    name: string;
    deleted_at?: string | null;
    commercials?: Commercial[];
}

export interface Grp {
    id?: number;
    channel_id: number;
    measurement_company_id: number;
    target_audience_id: number;
    day: string;
    time_from: string;
    price: number;
    channel?: Channel;
    measurementCompany?: MeasurementCompany;
    targetAudience?: TargetAudience;
    blocks?: Block[];
}

export interface Holding {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    channel_settings?: ChannelSetting[];
    retro_bonus_scales?: RetroBonusScale[];
}

export interface MeasurementCompany {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    targetAudiences?: TargetAudience[];
    grps?: Grp[];
}

export interface Mediaplan {
    id?: number;
    order_id: number;
    brand_id: number;
    channel_id: number;
    placement_type_id: number;
    commercial_type_id: number;
    target_audience_id: number;
    distribution_type?: number;
    name: string;
    taxes?: boolean;
    is_closed?: boolean;
    is_automatic?: boolean;
    disallow_ejection?: boolean;
    is_one_commercial_in_block?: boolean;
    is_fixed_price_blocks_allowed?: boolean;
    estimated_budget?: number;
    plan_budget?: number;
    fact_budget?: number;
    plan_fact_budget?: number;
    commitment_budget?: number;
    pure_mp_plan_wgrp?: number;
    pure_commitment_wgrp?: number;
    pure_mp_fact_wgrp?: number;
    pure_mp_plan_fact_wgrp?: number;
    pure_mp_plan_fact_wgrp_prime?: number;
    pure_mp_plan_fact_wgrp_off_prime?: number;
    mp_plan_wgrp?: number;
    commitment_wgrp?: number;
    mp_fact_wgrp?: number;
    mp_plan_fact_wgrp?: number;
    mp_plan_fact_wgrp_prime?: number;
    mp_plan_fact_wgrp_off_prime?: number;
    discount_coefficient?: number;
    placement_type_discount_coefficient?: number;
    basic_cpp_prime_cost?: number;
    basic_cpp_off_prime_cost?: number;
    spots_count?: number;
    spots_duration?: number;
    is_budget_fixed?: boolean;
    date_from: string;
    date_to: string;
    premium_position_discounts?: {
        "1F"?: number;
        "2F"?: number;
        "3F"?: number;
        "3L"?: number;
        "2L"?: number;
        "1L"?: number;
    } | null;
    created_at?: string;
    updated_at?: string;
    is_calculating?: number;
    order?: Order;
    brand?: Brand | null;
    channel?: Channel;
    placement_type?: PlacementType;
    commercial_type?: CommercialType;
    target_audience?: TargetAudience;
    commercials?: Commercial[];
    vip_dates?: VipDate[];
    discounts?: Discount[];
    is_vip?: boolean;
}

export interface Order {
    id?: number;
    project_id: number;
    placement_type_id: number;
    commercial_type_id: number;
    name: string;
    taxes?: boolean;
    is_closed?: boolean;
    estimated_budget?: number;
    date_from: string;
    date_to: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    plan_budget?: number;
    fact_budget?: number;
    plan_fact_budget?: number;
    commitment_budget?: number;
    is_calculating?: number;
    project?: Project | null;
    placement_type?: PlacementType | null;
    commercial_type?: CommercialType | null;
    order_settings?: OrderSetting[];
    mediaplans?: Mediaplan[];
    discounts?: Discount[];
    is_vip?: boolean;
    vip_dates?: string;
}

export interface OrderSetting {
    order_id: number;
    channel_id: number;
    target_audience_id: number;
    order?: Order;
    channel?: Channel;
    target_audience?: TargetAudience;
}

export interface PlacementType {
    id: number;
    name: string;
    projects?: Project[];
}

export interface PremiumPositionDiscount {
    id?: number;
    name: string;
    percent: number;
    from: string;
    to: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export interface Program {
    id?: number;
    genre_id?: number;
    genre?: Genre;
    name: string;
    duration?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export interface ProgramRelease {
    id?: number;
    channel_id: number;
    channel?: Channel;
    program_id: number;
    program?: Program;
    name?: string;
    date_start_at?: string;
    time_start_at?: string;
    date_end_at?: string;
    time_end_at?: string;
    duration?: string;
    broadcast_day: string;
    start_interval: number;
    end_interval?: number;
    broadcast_duration: number;
    created_at?: string;
    updated_at?: string;
}

export interface Project {
    id?: number;
    agency_id?: number;
    advertiser_id: number;
    year_id: number;
    placement_type_id?: number;
    commercial_type_id?: number;
    name: string;
    taxes?: boolean;
    is_closed?: boolean;
    are_mpc_settings_editable_by_agencies?: boolean;
    estimated_budget?: number;
    date_from: string;
    date_to: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    plan_budget?: number;
    fact_budget?: number;
    plan_fact_budget?: number;
    commitment_budget?: number;
    is_calculating?: number;
    agency?: Agency | null;
    advertiser?: Advertiser | null;
    year?: Year | null;
    placement_type?: PlacementType | null;
    commercial_type?: CommercialType | null;
    orders?: Order[];
    premium_position_discounts?: {
        "1F"?: number;
        "2F"?: number;
        "3F"?: number;
        "3L"?: number;
        "2L"?: number;
        "1L"?: number;
    } | null;
    discounts?: Discount[];
    budget_limits_applied?: boolean;
    is_vip?: boolean;
    vip_dates?: string;
    limit_advertiser_in_auction_block?: number;
}

export interface RetroBonusScale {
    id: number;
    year_id: number;
    advertiser_id?: number;
    holding_id: number;
    created_at?: string;
    updated_at?: string;
    advertiser?: Advertiser;
    holding?: Holding;
    retro_bonus_scale_details?: RetroBonusScaleDetail[];
}

export interface RetroBonusScaleDetail {
    id?: number;
    retro_bonus_scale_id: number;
    budget: number;
    percent: number;
    retroBonusScale?: RetroBonusScale;
}

export interface Saleshouse {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    channels?: Channel[];
    saleshouse_settings?: Channel[];
}

export interface Spot {
    id?: number;
    block_id: number;
    mediaplan_id?: number;
    commercial_id: number;
    double_spot_id?: string;
    distance?: number;
    priorities?: number;
    position?: string;
    actual_position?: string;
    order?: number;
    plan_wgrp?: number;
    fact_wgrp?: number;
    plan_fact_wgrp?: number;
    pure_plan_wgrp?: number;
    pure_fact_wgrp?: number;
    pure_plan_fact_wgrp?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    fact_grp_upload_details_id?: number;
    channel_project_price_project_id?: number;
    auction_coeff?: number | null;
    is_vip?: boolean;
}

export interface TargetAudience {
    id?: number;
    measurement_company_id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    grps?: Grp[];
}

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    login: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    roles?: Role[];
    permissions?: Permission[];
    access_permissions?: {
        access?: {
            saleshouse_ids?: number[];
            agency_ids?: number[];
            channel_ids?: number[];
            project_ids?: number[];
            advertiser_ids?: number[];
            brand_ids?: number[];
        };
        deny?: {
            project_ids?: number[];
            advertiser_ids?: number[];
            brand_ids?: number[];
        };
    };
}

export interface Role {
    id?: number;
    name: string;
    permissions?: Permission[];
    users?: User[];
}

export interface Permission {
    id?: number;
    name: string;
    roles?: Role[];
    users?: User[];
}

export interface VipDate {
    from: string;
    to: string;
    auction_coeff: number;
}

export interface Year {
    id: number;
    channel_settings?: ChannelSetting[];
    projects?: Project[];
}

export interface Genre {
    id?: number;
    name: string;
    deleted_at?: string | null;
}

export interface ChannelDiscount {
    id?: number;
    channel_id: number;
    year_id: number;
    month_id: number;
    percent: number;
    created_at?: string;
    updated_at?: string;
}

export interface Discount {
    id?: number;
    discount_type_id: number;
    from: string;
    to: string;
    percent?: number;
    type?: number;
    order?: number | null;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    discountable?: Project | Order | Mediaplan | null;
}

export interface UserLoginRequest {
    login: string;
    password: string;
}

// API client class
class OpenMediaLogicClient {
    private api: AxiosInstance;
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string = "http://localhost") {
        this.baseUrl = baseUrl;
        this.api = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        // Add interceptor to add token to all requests
        this.api.interceptors.request.use((config) => {
            if (this.token) {
                config.headers.Authorization = `Bearer ${this.token}`;
            }
            return config;
        });
    }

    setToken(token: string | null = null): void {
        this.token = token;
    }

    // Authentication methods
    async login(credentials: UserLoginRequest): Promise<TokenResource> {
        const response = await this.api.post<TokenResource>("/api/auth/login", credentials);
        console.log(response.data);
        this.token = response.data.access_token;
        return response.data;
    }

    async logout(): Promise<{ message: string }> {
        const response = await this.api.post<{ message: string }>("/api/auth/logout");
        this.token = null;
        return response.data;
    }

    async refreshToken(): Promise<TokenResource> {
        const response = await this.api.post<ApiResponse<TokenResource>>("/api/auth/refresh");
        this.token = response.data.data.access_token;
        return response.data.data;
    }

    async getCurrentUser(): Promise<User> {
        const response = await this.api.post<ApiResponse<User>>("/api/auth/me");
        return response.data.data;
    }

    // Advertiser methods
    async getAdvertisers(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Advertiser[]>> {
        const response = await this.api.get<ApiResponse<Advertiser[]>>("/api/advertisers", {
            params,
        });
        return response.data;
    }

    // Agency methods
    async getAgencies(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Agency[]>> {
        const response = await this.api.get<ApiResponse<Agency[]>>("/api/agencies", { params });
        return response.data;
    }

    // Block methods
    async getBlockById(id: number): Promise<Block> {
        const response = await this.api.get<ApiResponse<Block>>(`/api/blocks/${id}`);
        return response.data.data;
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
        const response = await this.api.post<ApiResponse<Block>>(
            `/api/blocks/${blockId}/spots`,
            data,
            {
                params: { force },
            }
        );
        return response.data.data;
    }

    async deleteSpotFromBlock(blockId: number, spotId: number): Promise<Block> {
        const response = await this.api.delete<ApiResponse<Block>>(
            `/api/blocks/${blockId}/spots/${spotId}`
        );
        return response.data.data;
    }

    // BlockType methods
    async getBlockTypes(): Promise<BlockType[]> {
        const response = await this.api.get<ApiResponse<BlockType[]>>("/api/block_types");
        return response.data.data;
    }

    // BrandClass methods
    async getBrandClasses(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<BrandClass[]>> {
        const response = await this.api.get<ApiResponse<BrandClass[]>>("/api/brand_classes", {
            params,
        });
        return response.data;
    }

    // Brand methods
    async getBrands(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Brand[]>> {
        const response = await this.api.get<ApiResponse<Brand[]>>("/api/brands", { params });
        return response.data;
    }

    // BrandGroup methods
    async getBrandGroups(brandClassId?: number): Promise<BrandGroup[]> {
        const response = await this.api.get<ApiResponse<BrandGroup[]>>("/api/brand_groups", {
            params: { brand_class_id: brandClassId },
        });
        return response.data.data;
    }

    // Channel methods
    async getChannels(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Channel[]>> {
        const response = await this.api.get<ApiResponse<Channel[]>>("/api/channels", { params });
        return response.data;
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
        const response = await this.api.get(`/api/channels/${channelId}/booking`, {
            params: {
                date_start_at: dateStartAt,
                date_end_at: dateEndAt,
                commercial_type_id: commercialTypeId,
                block_type_id: blockTypeId,
                project_id: projectId,
                order_id: orderId,
                mediaplan_id: mediaplanId,
            },
        });
        return response.data;
    }

    // ChannelCompany methods
    async getChannelCompanies(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<ChannelCompany[]>> {
        const response = await this.api.get<ApiResponse<ChannelCompany[]>>(
            "/api/channel_companies",
            { params }
        );
        return response.data;
    }

    // Commercial methods
    async getCommercials(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Commercial[]>> {
        const response = await this.api.get<ApiResponse<Commercial[]>>("/api/commercials", {
            params,
        });
        return response.data;
    }

    // CommercialType methods
    async getCommercialTypes(): Promise<CommercialType[]> {
        const response = await this.api.get<ApiResponse<CommercialType[]>>("/api/commercial_types");
        return response.data.data;
    }

    // CommercialVersionType methods
    async getCommercialVersionTypes(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<CommercialVersionType[]>> {
        const response = await this.api.get<ApiResponse<CommercialVersionType[]>>(
            "/api/commercial_version_types",
            { params }
        );
        return response.data;
    }

    // MeasurementCompany methods
    async getMeasurementCompanies(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<MeasurementCompany[]>> {
        const response = await this.api.get<ApiResponse<MeasurementCompany[]>>(
            "/api/measurement_companies",
            { params }
        );
        return response.data;
    }

    // Mediaplan methods
    async getMediaplans(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Mediaplan[]>> {
        const response = await this.api.get<ApiResponse<Mediaplan[]>>("/api/mediaplans", {
            params,
        });
        return response.data;
    }

    // Order methods
    async getOrders(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Order[]>> {
        const response = await this.api.get<ApiResponse<Order[]>>("/api/orders", { params });
        return response.data;
    }

    // PlacementType methods
    async getPlacementTypes(): Promise<PlacementType[]> {
        const response = await this.api.get<ApiResponse<PlacementType[]>>("/api/placement_types");
        return response.data.data;
    }

    // Project methods
    async getProjects(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams
    ): Promise<ApiResponse<Project[]>> {
        const response = await this.api.get<ApiResponse<Project[]>>("/api/projects", { params });
        return response.data;
    }

    // Saleshouse methods
    async getSaleshouses(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<Saleshouse[]>> {
        const response = await this.api.get<ApiResponse<Saleshouse[]>>("/api/saleshouses", {
            params,
        });
        return response.data;
    }

    // TargetAudience methods
    async getTargetAudiences(
        params?: PaginationParams & FilterParams & SortParams & IncludeParams & FieldParams
    ): Promise<ApiResponse<TargetAudience[]>> {
        const response = await this.api.get<ApiResponse<TargetAudience[]>>(
            "/api/target_audiences",
            { params }
        );
        return response.data;
    }

    // Year methods
    async getYears(): Promise<Year[]> {
        const response = await this.api.get<ApiResponse<Year[]>>("/api/years");
        return response.data.data;
    }
}

export default OpenMediaLogicClient;
