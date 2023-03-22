import React from "react";
import BoxEvaluateItem from "./box_evaluate_item";
import _ from "lodash";
import "./style.scss";
import ErrorEmpty from "../../../components/emty_data";

const BoxEvaluate = ({ data }) => {
  return (
    <div className="box_evaluate">
      <div className="box_evaluate_intro">
        <img
          src="https://love-travel-website.vercel.app/static/media/reivew.08210235c0c34b0795d24c2f1714b208.svg"
          alt=""
        />
        <div className="box_evaluate_text">
          <h2>Bạn đã từng đến đây ?</h2>
          <span>
            Chia sẻ trải nghiệm và cảm nhận của bản thân cho mọi người cùng biết{" "}
          </span>
          <span>Những review chất lượng sẽ được xuất hiện ở bảng tin đấy!</span>
        </div>
      </div>
      <div className="box_evaluate_content">
        {_.isEmpty(data) ? (
          <ErrorEmpty />
        ) : (
          data.map((item) => {
            return <BoxEvaluateItem data={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default BoxEvaluate;
