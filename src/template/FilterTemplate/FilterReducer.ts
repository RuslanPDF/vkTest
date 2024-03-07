import {IDispatch} from "./FilterContext.ts";
import {IGroup} from "../../interface/Group.ts";
import constants from './Reducer.constant.ts';

interface IActionState {
	avatar: string;
	friends: boolean;
	private_groups: string;
}

let data: IGroup[] = []
const actionState: IActionState = {
	avatar: '',
	friends: false,
	private_groups: '',
}

export default function filterReducer(store: IGroup[], action: IDispatch): IGroup[] {
	switch (action.type) {
		case constants.FILTER_BY_GROUPS: {
			console.log(action.value)
			actionState.private_groups = action.value as string;
			return filterByActionState();
		}
		case constants.FILTER_BY_COLOR_AVATAR:
			actionState.avatar = action.value as string;
			return filterByActionState();
		case constants.FILTER_BY_FRIENDS:
			actionState.friends = action.value as boolean;
			return filterByActionState();
		case constants.UPDATE_STORE:
			if (action.groups) {
				data = action.groups;
				return action.groups;
			} else {
				return store;
			}
		default:
			return store;
	}
}

function filterByActionState() {
	return data.filter(({friends, avatar_color, closed}: IGroup) => {
		const avatar = actionState.avatar;
		const friend = actionState.friends;
		const private_groups = actionState.private_groups;
		return (
			(avatar !== '' ? avatar === avatar_color : avatar_color) &&
			(friend ? friends : true ) &&
			(private_groups ? (private_groups === 'open' ? closed === true : closed === false) : true)
		)
	})
}