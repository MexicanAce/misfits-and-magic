export interface ZkEraNft {
    attributes: ZkEraAttributes[];
    description: string;
    image: string;
    name: string;
}

export interface ZkEraAttributes {
    type: string;
    value: string;
}