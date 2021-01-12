import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselContainer: React.FC = () => {
    const responsive = {
        desktop: {
            breakpoint: {max: 4000, min: 768},
            items: 1,
            partialVisibilityGutter: 0
        },
        tablet: {
            breakpoint: {max: 768, min: 600},
            items: 1,
            partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: {max: 600, min: 0},
            items: 1,
            partialVisibilityGutter: 30
        }
    };
    return (
        <Carousel
            responsive={responsive}
            arrows
            showDots
            infinite
            additionalTransfrom={0}
            itemClass={"react-carousel-item"}
            minimumTouchDrag={80}
            partialVisible={false}
        >
            <img
                style={{width: "100%"}}
                alt=""
                src="https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
            <img
                style={{width: "100%"}}
                alt=""
                src="https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
            <img
                style={{width: "100%"}}
                alt=""
                src="https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
        </Carousel>
    );
};

export default CarouselContainer;
