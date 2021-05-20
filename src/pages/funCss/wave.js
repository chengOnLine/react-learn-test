import React , { useState , useEffect , forwardRef} from 'react';
import ItemBox from "../../components/itemBox";
import style from "./style/wave.scss";

export default forwardRef(( props , ref) => {
    return <React.Fragment>
        <div className={style.wave}>
            <ItemBox title="css 利用 圆和旋转 实现波浪">
                <div className="rect">
                    <div className="circle c1"></div>
                    <div className="circle c2"></div>
                    {/* <div className="circle c3"></div> */}
                </div>
            </ItemBox>
            <ItemBox title="css 利用多个div高度变换 实现波浪">
                <div className="g-rect">
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>
                    <div className="g-item"></div>

                </div>
            </ItemBox>
        </div>
    </React.Fragment>
} )