import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./HomeSkeleton.css";

const HomeSkeleton = ({ fields }) => {
    return Array(fields)
        .fill(0)
        .map((_, i) => (
            <div className="home-skeleton" key={i}>
                <div className="home-skeleton__header">
                    <div className="home-skeleton__header-left">
                        <div className="home-skeleton__header-logo">
                            <Skeleton circle width={64} height={64} />
                        </div>
                        <div className="home-skeleton__header-name">
                            <Skeleton width={200} height={36} style={{ borderRadius: "6px" }} />
                        </div>
                    </div>
                    <div className="home-skeleton__header-right">
                        <Skeleton width={194} height={38} style={{ borderRadius: "6px" }} />
                    </div>
                </div>
                <div className="home-skeleton__body">
                    <div className="home-skeleton__body-column">
                        <Skeleton height={290} style={{ borderRadius: "6px" }} />
                    </div>
                    <div className="home-skeleton__body-column">
                        <Skeleton height={290} style={{ borderRadius: "6px" }} />
                    </div>
                    <div className="home-skeleton__body-column">
                        <Skeleton height={290} style={{ borderRadius: "6px" }} />
                    </div>
                    <div className="home-skeleton__body-column">
                        <Skeleton height={290} style={{ borderRadius: "6px" }} />
                    </div>
                    <div className="home-skeleton__body-column">
                        <Skeleton height={290} style={{ borderRadius: "6px" }} />
                    </div>
                </div>
            </div>
        ));
};

export default HomeSkeleton;
