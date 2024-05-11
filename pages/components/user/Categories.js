import React, { useState, useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import { LuTrendingUp } from 'react-icons/lu';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material';
import Mstyles from '/styles/mainstyle.module.css';

function Categories() {
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const theme = useTheme();

    const fetchData = async () => {
        setIsLoading(true);

        const data = await fetch("/api/user/category_list", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(parsedData => {
                if (parsedData.ReqData && parsedData.ReqData.MainCatList) {
                    setRetdata(parsedData.ReqData.MainCatList);
                    setIsLoading(false);
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);

            });
    };

    useEffect(() => {
        fetchData();
    }, [router.query]);

    // Define the color list
    const colorList = [
        { backgroundColor: '#FF6F61', fontColor: '#FFFFFF' }, // Red background, white font
        { backgroundColor: '#6A1B9A', fontColor: '#FFFFFF' }, // Purple background, white font
        { backgroundColor: '#0288D1', fontColor: '#FFFFFF' }, // Blue background, white font
        { backgroundColor: '#00796B', fontColor: '#FFFFFF' }, // Teal background, white font
        { backgroundColor: '#FFC107', fontColor: '#000000' }, // Yellow background, black font
        // Add more colors as needed
    ];

    return (
        <div className={Mstyles.HomeCatbox}>
            <div className={Mstyles.TTitle}>
                <div className={Mstyles.TTitleA}>
                    <LuTrendingUp size={20} />
                </div>
                <div className={Mstyles.TTitleB}>
                    <span>Feeds by Interests</span>
                </div>
            </div>

            <div className={Mstyles.CatDiv}>
                {isLoading ? (
                    <div className={Mstyles.HCatGrid}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div className={Mstyles.HomeCatItemLoader} key={index}>
                                <Skeleton variant="rounded" width={100} style={{ margin: '10px' }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {Retdata.length > 0 && (
                            <div className={Mstyles.HCatGrid}>
                                {Retdata.map((item, index) => {
                                    // Determine the color combination based on the index
                                    const colorIndex = index % colorList.length;
                                    const { backgroundColor, fontColor } = colorList[colorIndex];

                                    return (
                                        <div
                                            className={Mstyles.HomeCatItem}
                                            key={index}
                                            style={{ backgroundColor, color: fontColor }}
                                            onClick={() => router.push(`/feeds/interests/${item.slug}`)}
                                        >
                                            <span>{item.title.length > 15 ? `${item.title.slice(0, 15)}...` : item.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Categories);
