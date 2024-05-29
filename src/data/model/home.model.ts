export interface BaseResponse<D> {
 message: string;
 data: D[];
}

export interface ContactsListItem {
 id: string;
 firstName: string;
 lastName: string;
 age: number;
 photo: string;
}

export interface ContactRequest {
 age: string;
 photo: string;
 firstName: string;
 lastName: string;
}
