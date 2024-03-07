import React, {useContext} from "react";
import {GroupDispatchContext} from "../../template/FilterTemplate/FilterContext.ts";
import constant from '../../template/FilterTemplate/Reducer.constant.ts';
import cs from './FilterFrom.module.css';
import {IGetGroupsResponse, IGroup} from "../../interface/Group.ts";

export function FilterFrom() {
	const dispatch = useContext(GroupDispatchContext);

	React.useEffect(() => {
		async function fetchGroups() {
			const response: Promise<IGetGroupsResponse> = new Promise((resolve, reject) => {
				setTimeout(async () => {
					try {
						const randomNum = Math.floor(Math.random() * 10);
						if (randomNum >= 3) {
							const response = await fetch('groups.json');
							const data: IGroup[] = await response.json();
							resolve({
								result: 1,
								data
							})
						} else {
							throw new Error('Ошибка в сети!');
						}
					} catch (e) {
						reject(e)
					}
				}, 1000)
			})

			response
				.then(({data}) => {
					if (dispatch && data) {
						dispatch({
							type: constant.UPDATE_STORE,
							groups: data
						})
					}
				})
				.catch(() => console.error('Ошибка в сети!'))
		}

		fetchGroups()
	}, [])

	function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
		const tagName: string = event.target.name;

		if (dispatch) {
			switch (tagName) {
				case constant.FILTER_BY_FRIENDS: {
					const value = event.target.checked
					dispatch({
						type: constant.FILTER_BY_FRIENDS,
						value: value
					})
					break
				}
				case constant.FILTER_BY_GROUPS: {
					const value = event.target.selectedOptions[0].value
					dispatch({
						type: constant.FILTER_BY_GROUPS,
						value
					})
					break;
				}
				case constant.FILTER_BY_COLOR_AVATAR: {
					const value = event.target.selectedOptions[0].value
					dispatch({
						type: constant.FILTER_BY_COLOR_AVATAR,
						value
					})
					break
				}
			}
		}
	}

	return (
		<div className={cs.groupsForm}>
			<form onChange={handleChange}>
				<select name={constant.FILTER_BY_GROUPS}>
					<option value={''}>all</option>
					<option value={'closed'}>closed</option>
					<option value={'open'}>open</option>
				</select>
				<select name={constant.FILTER_BY_COLOR_AVATAR}>
					<option value={''}>all</option>
					<option value={'red'}>red</option>
					<option value={'green'}>green</option>
					<option value={'yellow'}>yellow</option>
					<option value={'blue'}>blue</option>
					<option value={'purple'}>purple</option>
					<option value={'white'}>white</option>
					<option value={'orange'}>orange</option>
				</select>
				<label htmlFor="friends_filter">
					<input name={constant.FILTER_BY_FRIENDS} id={'friends_filter'} type="checkbox"/>
					<p>Friends Filter</p>
				</label>
			</form>
		</div>
	);
}
