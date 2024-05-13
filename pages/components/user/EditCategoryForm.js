// EditCategoryForm.js
import React, { useState, useEffect, useContext } from 'react';
import { LuPlus, LuX, LuPencilLine, LuTrash2 } from "react-icons/lu";
import Mstyles from '/styles/mainstyle.module.css'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import IconButton from '@mui/material/IconButton';
import CheckloginContext from '/context/auth/CheckloginContext'
const EditCategoryForm = ({ isOpen, item, GetCatList, handleClose }) => {
    const [title, setTitle] = useState();
    const [order, setOrder] = useState();
    const [slug, setSlug] = useState();
    const [LoadingBtn, setLoadingBtn] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    useEffect(() => {
        setTitle(item.title)
        setSlug(item.slug)
        setOrder(item.order)
    }, [item]);

    const EditData = async (e) => {
        e.preventDefault();
        if (title !== null && title !== '') {
            setLoadingBtn(true)

            const sendUM = {
                title: title,
                slug: slug,
                order: order

            }
            const data = await fetch("/api/user/update_category", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setLoadingBtn(false)
                    if (parsed.ReqData.done) {
                        Contextdata.ChangeAlertData(`Category Updated`, 'success');

                        GetCatList()
                        setTitle(null)
                        handleClose()
                    } else {
                        Contextdata.ChangeAlertData(`Something Went Wrong`, 'warning');
                    }
                })
        }
        console.log('dfd')
    }


    return (
        <div className={Mstyles.AddCatBox} style={{ display: isOpen ? 'block' : 'none' }}>

            <form onSubmit={EditData} className={Mstyles.fadeinAnimation}>
                <div className={Mstyles.inputlogin}>
                    <TextField
                        required
                        label="Category Title"
                        fullWidth
                        value={title}
                      
                        onInput={e => setTitle(e.target.value)}

                    />
                </div>
                <div className={Mstyles.inputlogin}>
                    <TextField
                        required
                        label="Category Order"
                        fullWidth
                        type='Number'
                        value={order}
                        onInput={e => setOrder(e.target.value)}
                       
                    />
                </div>
                <div style={{ height: '10px' }}></div>
                <div className={Mstyles.Flexbtnbox}>
                    <LoadingButton
                        size="small"
                        type='submit'

                        endIcon={<FiChevronRight />}
                        loading={LoadingBtn}
                        desabled={LoadingBtn}
                        loadingPosition="end"
                        variant="contained"

                    >
                        <span>Update Category</span>
                    </LoadingButton>


                    <LoadingButton
                        size="small"
                        endIcon={<LuX />}
                        loading={false} // Change this to handle loading state
                        loadingPosition="end"
                        variant="text"
                        onClick={handleClose}
                    >

                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default EditCategoryForm;