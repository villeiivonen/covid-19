import React from "react";
import Carousel from "react-multi-carousel";
import DailyInfections from "components/Cards/dailyInfections";
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
            <DailyInfections />
            <DailyInfections />
            <DailyInfections />
        </Carousel>
    );
};

export default CarouselContainer;
