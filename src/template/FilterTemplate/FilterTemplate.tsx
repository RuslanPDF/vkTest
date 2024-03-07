import React, {Reducer, useReducer} from 'react';
import filterReducer from "./FilterReducer.ts";
import {FilterFrom} from "../../components/FilterFrom/FilterFrom.tsx";
import {FilterResults} from "../../components/FilterResults/FilterResults.tsx";
import {GroupContext, GroupDispatchContext, IDispatch} from "./FilterContext.ts";
import {IGroup} from "../../interface/Group.ts";

const FilterTemplate = () => {
	const [groups, dispatch] = useReducer<Reducer<IGroup[] | [], IDispatch>>(filterReducer, []);

	return (
		<GroupContext.Provider value={groups}>
			<GroupDispatchContext.Provider value={dispatch}>
				<FilterFrom/>
				<FilterResults/>
			</GroupDispatchContext.Provider>
		</GroupContext.Provider>
	);
};

export default FilterTemplate;