import { useRef } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	isOpen,
	onClick,
}: {
	isOpen: boolean;
	onClick: () => void;
}) => {
	const sidebarRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
