import { useState, useEffect, useContext, memo } from 'react';
import Mstyles from '/styles/mainstyle.module.css';
import { useRouter } from 'next/router';
import CheckloginContext from '/context/auth/CheckloginContext';

const MobileAppFooter = () => {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        if (Contextdata.AppMode === true) {

            setTimeout(function () {
                setLoading(false)
            }, 3000);
        }

    }, [router.query]);
    return (
        <div>
            {!Loading &&
                <div className={Mstyles.fadeinAnimation}>
                    <div className={Mstyles.MobileAppFooter}>

                        <div className={Mstyles.AppF} onClick={() => router.push(`${SocialHandles.Playstore}`)}>
                            <div className={Mstyles.AppFA}>
                                <span>Download App</span>
                                <small>For Best Experience</small>
                            </div>
                            <div className={Mstyles.AppFB}>
                                <div className={Mstyles.AppFBimg}>
                                    <img src='/playstore.png' alt='app' width='100%' />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            }
        </div>
    )
}

export default MobileAppFooter
