import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export interface IlocalMedia {
    getLocalmedia: (dispatch: Dispatch<UnknownAction>) => Promise<boolean>
}