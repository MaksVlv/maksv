import React, { useState } from "react";
import styles from './achievements.module.scss';
import { useTranslation } from "next-i18next";
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';


const Statistic = ({ value }: { value: number }) => {
    const animatedValue = useSpring({ from: { number: 0 }, to: { number: value }, config: { duration: 2000 } });

    return (
        <animated.span>
            {animatedValue.number.interpolate((val: any) => Math.floor(val))}
        </animated.span>
    );
};

interface AchievementsProps {
    construction: boolean
}

export default function Achievements({ construction }: AchievementsProps) {

    const { t } = useTranslation();

    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    const onVisibilityChange = (isVisible: boolean) => {
        if (isVisible) {
            setIsAnimated(true);
        }
    };

    return (
        <div className={styles.achievements}>
            <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
                <div className={styles.block + " wrapper"}>
                    <h2>{t("evaluationPage:ach.title")}</h2>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <h4>{isAnimated && <Statistic value={construction ? 30 : 2140} />}</h4>
                            <p>{t("evaluationPage:ach.client")}</p>
                        </div>
                        <div className={styles.stat}>
                            <h4>{isAnimated && <Statistic value={construction ? 26 : 2580} />}</h4>
                            <p>{t("evaluationPage:ach.projects")}</p>
                        </div>
                        <div className={styles.stat}>
                            <h4>{isAnimated && <Statistic value={construction ? 4010 : 4500} />} {t("evaluationPage:ach.hours")}</h4>
                            <p>{t("evaluationPage:ach.time")}</p>
                        </div>
                        <div className={styles.stat}>
                            <h4>{isAnimated && <Statistic value={construction ? 20 : 100} />}+</h4>
                            <p>{t("evaluationPage:ach.sug")}</p>
                        </div>
                    </div>
                </div>
            </VisibilitySensor>
        </div>
    );
}
