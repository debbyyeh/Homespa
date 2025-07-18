import star from "../assets/star.png";
import Lightbulb from "../components/Lightbulb.tsx";
import Popup from "../components/Popup.tsx";
import serviceInfo from "../../public/data.json";
import { useEffect, useState } from "react";

export interface ServiceInfoProps {
    id: string;
    name: string;
    bannerUrl: string;
    courses: Array<{
      courseCategory?: string;
      categoryLists: Array<{
        courseName: string;
        courseImageUrl?: string;
        duration: number;
        price: number;
        courseId?: string;
      }>;
    }>;
  }

const textStyle =
  "text-black group-hover:text-[#c3a76c] transition-colors duration-300 text-center";
const diamondStyle = {
    "--diamond-width": "12px",
    "--diamond-height": "12px",
    "--diamond-top": "4px",
    "--diamond-left": "-15px",
} as React.CSSProperties;

export interface PopupProps {
    courseId: string;
    courseCategory: string;
    id: string,
}

export default function ContentPage({id}: {id: string}) {
    const [detailInfo, setDetailInfo] = useState<ServiceInfoProps | undefined>(undefined);
    const [popupId, setPopupId] = useState<PopupProps>({
        courseId: "",
        courseCategory: "",
        id: "",
    });

   useEffect(()=>{
        const detailInfo = serviceInfo.find((item) => item.id === id) as ServiceInfoProps | undefined;
        setDetailInfo(detailInfo);
   },[id]);

   function getCourseCategoryByPath(data: ServiceInfoProps, courseId: string) {
    
        for (const course of data.courses) {
            const match = course.categoryLists.find(item => item.courseId === courseId);
            if (match) return course.courseCategory;
        }
        return null;
    }

    useEffect(() => {
        const handlePopState = () => {
            const url = new URL(window.location.origin + window.location.pathname);
            const courseId = url.searchParams.get("id") || "";
            if (detailInfo && courseId) {
              setPopupId({
                id: detailInfo.id,
                courseId,
                courseCategory: getCourseCategoryByPath(detailInfo, courseId) || ""
              });
            }else{
                setPopupId({
                    id: "",
                    courseId: "",
                    courseCategory: ""
                });
            }
        };

        handlePopState();

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [detailInfo]);

    return(
        <>
        {detailInfo ? 
            <>
                <div className="bg-[url('../assets/service/banner.jpg')] bg-no-repeat bg-center bg-cover h-[300px] md:h-[750px] relative px-[30px] md:px-0">
            <div
            className="md:max-w-1/2 w-full mx-auto absolute top-1/2 left-1/2 -translate-1/2 text-center mb-8 flex items-baseline justify-center"
            >
            <h2
                className="text-4xl md:text-6xl font-light text-primary mr-[10px] md:mr-[20px]"
            >
                Services
            </h2>
            <p className="text-2xl md:text-3xl text-secondary">課程服務</p>
            <img
                src={star.src}
                alt="star"
                className="w-[25px] h-[25px] md:w-[29px] md:h-[29px] self-start"
            />
            </div>
            <img
            src={detailInfo.bannerUrl}
            alt={detailInfo.id}
            width={500}
            height={200}
            loading="lazy"
            className="lg:max-w-3xl md:max-w-2xl max-w-4/5 w-full h-[90px] md:h-[200px] object-cover absolute bottom-0 left-1/2 -translate-x-1/2"
            />
                </div>
                <div
                id="list"
                className="bg-custom-gradient text-primary md:px-[40px] px-[30px] py-[20px] md:p-[50px] lg:max-w-3xl md:max-w-2xl w-full mx-auto mb-[30px] relative">
                <div className="text-center font-medium text-2xl mb-[20px] md:mb-[30px]">
                {detailInfo.name}
                {detailInfo.id === "face" ? (
                    <span>
                        <Lightbulb />
                    </span>
                ) : null}
                </div>
                <div className="w-full h-[1px] bg-[#6d4a2f] relative mx-auto">
                <div
                    className="w-[30px] h-[11px] absolute top-1/2 left-1/2 -translate-1/2 bg-gradient-diamond"
                >
                </div>
                </div>
                {popupId.courseId ? <Popup courseId={popupId.courseId} courseCategory={popupId.courseCategory} id={detailInfo.id}/> : 
                detailInfo.courses.map((item) => (
                    <div
                        key={`list-${item.categoryLists[0].courseId}`}
                        id="service-list"
                        className={`md:text-sm border-b flex flex-col md:flex-row ${item.courseCategory ? "justify-between" : "justify-center"} items-center`}
                    >
                    {item.courseCategory && (
                        <div className={`my-[15px] text-center max-w-1/2 ${detailInfo.id === "body" ? "md:max-w-1/5 lg:max-w-1/6" : "md:max-w-1/6"} w-full bg-[#6d4a2f] rounded-full text-white py-[12px] px-[15px] md:mr-[30px] whitespace-nowrap `}>
                        {item.courseCategory}
                        </div>
                    )}

                    <div
                        className={`w-full ${item.courseCategory ? "md:w-4/5" : "md:w-full"}`}
                    >
                        {item.categoryLists.map((course) => (
                        <ul 
                            key={`course-${course.courseId}-${course.courseName}`}
                            className="2xl:text-lg flex flex-col md:flex-row justify-between items-start md:items-center mt-[15px] mb-[15px] transition-colors duration-300 group cursor-pointer">
                            <div className="md:hidden mb-[10px]">
                            <li
                                style={diamondStyle}
                                className={`text-[#6d4a2f] ${detailInfo.id === "face" ? "basis-7xs" : "basis-5xs"} before-diamond group-hover:text-[#c3a76c] transition-colors duration-300`}
                            >
                                {course.courseName}
                            </li>
                            </div>
                            <li
                                style={diamondStyle}
                                className={`hidden md:block text-[#6d4a2f] ${detailInfo.id === "face" ? "basis-7xs" : "basis-5xs"} before-diamond group-hover:text-[#c3a76c] transition-colors duration-300`}
                            >
                                {course.courseName}
                            </li>
                            <div className="md:hidden flex items-center justify-between w-full">
                            <li className={textStyle}>{course.duration}分鐘</li>
                            <li className={textStyle}>${course.price}</li>
                            {(detailInfo.id === "face" || detailInfo.id === "body") && (
                                <button
                                    onClick={()=>{
                                        const url = new URL(window.location.href);
                                        url.searchParams.set("id", course.courseId ?? "");
                                        history.pushState({}, "", url);
                                        setPopupId({
                                            id: detailInfo.id,
                                            courseId: course.courseId ?? "",
                                            courseCategory: item.courseCategory ?? ""
                                        });
                                    }}
                                    data-id={`${course.courseId}`}
                                    className="more block mt-2 bg-[#c8c8c8] group-hover:bg-[#c3a76c] rounded-[5px] text-white py-[2px] px-[8px] transition-colors duration-300 flex-none text-center w-fit"
                                >
                                詳細介紹
                                </button>
                            )}
                            </div>
                            <li className={`hidden md:block ${textStyle}`}>
                                {course.duration}分鐘
                            </li>
                            <li className={`hidden md:block ${textStyle} font-bold`}>
                                ${course.price}
                            </li>
                            {(detailInfo.id === "face" || detailInfo.id === "body") && (
                            <button
                                data-id={`${course.courseId}`}
                                onClick={()=>{
                                    const url = new URL(window.location.href);
                                    url.searchParams.set("id", course.courseId ?? "");
                                    history.pushState({}, "", url);
                                    setPopupId({
                                        id: detailInfo.id,
                                        courseId: course.courseId ?? "",
                                        courseCategory: item.courseCategory ?? ""
                                    });
                                }}
                                className="more md:block hidden mt-2 bg-[#c8c8c8] group-hover:bg-[#c3a76c] rounded-[5px] text-white py-[2px] px-[8px] transition-colors duration-300 flex-none text-center w-fit font-bold cursor-pointer"
                            >
                                詳細介紹
                            </button>
                            )}
                        </ul>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            </>
        : null}
        </>
    )
}