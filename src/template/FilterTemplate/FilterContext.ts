import React, {createContext} from "react";
import {IGroup} from "../../interface/Group.ts";

export interface IDispatch {
	type: string;
	value?: string | boolean;
	groups?: IGroup[];
}

export const GroupContext = createContext<IGroup[] | []>([]);
export const GroupDispatchContext = createContext<React.Dispatch<IDispatch> | null>(null)