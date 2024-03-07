import React from "react";
import {IGroup} from "../../interface/Group.ts";
import Accordion from "../Accardion/Accardion.tsx";
import cs from './GroupCard.module.css';

export function GroupCard({avatar_color, name, closed, friends, members_count}: IGroup) {
	return (
		<div className={cs.group}>
			<div className={cs.groupCard}>
				<div
					style={{background: `${avatar_color}`}}
					className={cs.avatar}
				>

				</div>
				<div className={cs.cardInfo}>
					<div>Group name: {name}</div>
					<DisplayDataOnCondition inputText={'Group'} bool={closed} correct={'Публичная'} incorrect={'Приватная'}/>
					<div>Members Count: {members_count}</div>
				</div>
			</div>
			{friends && <Accordion friends={friends}/>}
		</div>
	);
}

interface IProps {
	bool: boolean,
	correct: string,
	incorrect: string;
	inputText: string;
}

function DisplayDataOnCondition({bool, correct, incorrect, inputText}: IProps): JSX.Element {
	return (
		<div>
			{inputText}:{bool ? correct : incorrect}
		</div>
	)
}

