import React from 'react';

const Forbidden = () => {
    return (
        <div style={{width:"100%", height:"100vh",display:"grid", placeItems:'center'}}>
            <img src="https://conectemos.com/wp-content/uploads/2021/03/Error-403-Prohibido.png" alt="" />
            <i>Không đủ quyền truy cập</i>
        </div>
    );
};

export default Forbidden;