import React, {useContext} from "react";
import {GroupContext} from "../../template/FilterTemplate/FilterContext.ts";
import {IGroup} from "../../interface/Group.ts";
import {GroupCard} from "../GroupCard/GroupCard.tsx";

import cs from './FilterResults.module.css';

export function FilterResults() {
	const data: IGroup[] = useContext(GroupContext);

	if(data.length === 0){
		return <div>нету данных</div>
	}

	return (
		<div className={cs.groupsList}>
			{data.map((group: IGroup) => (
				<GroupCard key={group.id} {...group} />
			))}
		</div>
	);
}
