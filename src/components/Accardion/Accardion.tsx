import React, {useRef, useState} from "react";
import arrow from '../../assets/arrow.svg';
import {IUser} from "../../interface/Group.ts";
import cs from './Accardion.module.css';

interface IProps {
	friends: IUser[]
}

function Accordion({friends}: IProps): JSX.Element {
	const [active, setActive] = useState<boolean>(false);
	const content = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState<string>("0px");

	function toggleAccordion() {
		if (content?.current) {
			setActive(!active);
			setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
		}
	}

	return (
		<div className={cs.accordion__section}>
			<div
				className={`${cs.accordion} ${active ? cs.active : ""}`}
				onClick={toggleAccordion}
			>
				<img src={arrow} alt=""/>
			</div>
			<div
				ref={content}
				style={{maxHeight: `${height}`}}
				className={cs.accordion__content}
			>
				<div className={cs.accordion__list}>
					{
						friends.map((f: IUser, i) => (
							<div key={i}>
								<p>First Name: {f.first_name}</p>
								<p>Last Name: {f.last_name}</p>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default Accordion;
