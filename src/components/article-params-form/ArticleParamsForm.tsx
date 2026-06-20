import { useState, useRef } from 'react';
import { useCloseOnOutsideClickOrEsc } from 'src/components/article-params-form/hooks/useCloseOnOutsideClickOrEsc'
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => setIsFormOpen(!isFormOpen);

	useCloseOnOutsideClickOrEsc({
	    isOpenElement: isFormOpen,
	    elementRef: sidebarRef,
	    onClose: () => setIsFormOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isFormOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply(formState);
					}}
					onReset={(e) => {
    				    e.preventDefault();
    				    setFormState(defaultArticleState);
    				    onApply(defaultArticleState);
    				}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Выбрать шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
