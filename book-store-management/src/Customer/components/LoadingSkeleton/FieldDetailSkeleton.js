import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./FieldDetailSkeleton.css";

const FieldDetailSkeleton = ({ books }) => {
    return Array(books)
        .fill(0)
        .map((_, i) => (
            <div className="fieldDetail-skeleton" key={i}>
                <div className="fieldDetail-skeleton__image">
                    <Skeleton height={280} />
                </div>

                <div className="fieldDetail-skeleton-titleAndAuthor">
                    {/* Book Title */}
                    <h2 className="fieldDetail-skeleton-title">
                        <Skeleton count={2} style={{ marginBottom: "4px" }} />
                    </h2>

                    {/* Book Author */}
                    <h3 className="fieldDetail-skeleton-author">
                        <Skeleton />
                    </h3>
                </div>

                {/* Book Price */}
                <div className="fieldDetail-skeleton-price">
                    <div className="fieldDetail-skeleton-price">
                        <Skeleton height={18} />
                    </div>
                </div>

                <div className="fieldDetail-skeleton-add-btn">
                    <Skeleton height={40} style={{ borderRadius: "14px" }} />
                </div>
            </div>
        ));
};

export default FieldDetailSkeleton;
