import React , { useState , useEffect , forwardRef} from 'react';
import ItemBox from "../../components/itemBox";
import style from "./style/wave.scss";
export default forwardRef(( props , ref) => {
    return <React.Fragment>
        <div className={style.className}>
            <ItemBox title="纯css 实现波浪">
                
            </ItemBox>
        </div>
    </React.Fragment>
} )