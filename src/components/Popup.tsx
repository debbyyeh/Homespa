import { useEffect, useState } from "react";
const diamondStyles: React.CSSProperties = {
  '--diamond-width': '9px',
  '--diamond-height': '9px',
  '--diamond-top': '5px',
  '--diamond-left': '-15px',
} as React.CSSProperties;


interface ContentProps {
  courseName: string;
  courseImageUrl?: string;
  duration: number;
  price: number;
  courseId?: string;
  efficacy: string[];
  introduction: string;
  content: string[];
  productsImageUrl?: string;
  products:{
    productName:string,
    link:string
  }[]
}

export default function Popup() {

  const [isShow, setIsShow] = useState<boolean>(false);

  const [course, setCourse] = useState<ContentProps|null>(null);
  const [categoryId, setCategoryId] = useState<string|null>(null);
  const [clickCourseId, setClickCourseId] = useState<string | null>(null);

  const updateParamsFromUrl = () => {
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/');
    const category = pathParts[2];
    const id = new URLSearchParams(url.search).get('id');
    setIsShow(!!id);

    setCategoryId(category);
    setClickCourseId(id);

  };

  useEffect(() => {
    updateParamsFromUrl();
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', updateParamsFromUrl);
    return () => window.removeEventListener('popstate', updateParamsFromUrl);
  }, []);


  useEffect(() => {
    if(categoryId && clickCourseId) {
      fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const category = data.find((x: { id: string | null; }) => x.id === categoryId);

        if (!category) {
          console.warn('找不到對應的分類');
          return;
        }

        let foundCourse = null;
        for (const courseGroup of category.courses) {
          foundCourse = courseGroup.categoryLists.find((c:{courseId:string|null}) => c.courseId === clickCourseId);
          if (foundCourse) break;
        }

        setCourse(foundCourse);

      })
      .catch(err => {
        console.error('讀取資料失敗:', err);
      });
    }

  }, [categoryId,clickCourseId]);

  

  const backToCategory = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('id');
    history.replaceState(null, '', url.pathname);
    setIsShow(false);
    window.location.reload()
  }

  return(
     course && isShow ? 
    <div className=" w-full my-[20px]" id="popup">
    <div
      className="my-[20px] text-center max-w-1/3 md:max-w-1/5 w-full bg-[#6d4a2f] rounded-full text-white py-[12px] px-[15px] whitespace-nowrap mx-auto"
    >
     淨化保濕
    </div>
    <div className="text-xl text-center mb-[20px]"> {course?.courseName}</div>
    <div className="w-5 h-[13px] bg-[url('../assets/diamond_l.png')] bg-no-repeat bg-center bg-contain mx-auto mb-[20px]" />
    <div className="flex flex-col md:flex-row items-center md:max-h-[200px] overflow-hidden mb-[80px]">
      <div className="md:w-1/2 w-full">
        <div className="bg-[#c3a76c] rounded-[5px] text-center text-white md:text-xl tracking-wider py-[6px] md:w-1/3 w-1/4 mb-[10px]">
          課程功效
        </div>
        <div
          style={diamondStyles}
          className="before-circle text-[#6d4a2f] text-base leading-[1.6] md:mr-[20px] mb-[10px] md:mb-0"
        >
          {course?.efficacy.map((word, index)=>{
            const [title, description] = word.split(':');
            return <div key={index}>
              <span key={`${index}_title`} className="font-medium">{title}</span>
              <span key={`${index}_description`}>{description}</span>
            </div>
          })}
        </div>
      </div>
      <div className="md:w-1/2 w-full rounded-[100px] overflow-hidden md:h-auto h-[150px]">
        <img
          src={course.courseImageUrl}
          alt="course image"
          width={10}
          height={10}
          className="w-full h-full object-cover "
          loading="lazy"
        />
      </div>

    </div>
    <div className="w-full relative bg-[#fff] py-[30px] px-[25px] shadow-md shadow-[0_0_10px_2px_rgba(66,42,23,0.27)] md:mb-[80px] mb-[40px]">
      <div className="bg-[#c3a76c] rounded-[5px] text-center text-white md:text-xl tracking-wider p-[6px] md:w-1/6 absolute top-[-25px] left-0">
        課程簡介
      </div>
      <div className="text-base leading-[1.8] md:mt-[12px]">
        {course?.introduction}
      </div>
    </div>
    <div className="md:w-full  border-b-1">
      <div className="bg-[#c3a76c] rounded-[5px] text-center text-white md:text-xl tracking-wider py-[6px] md:w-1/6 w-1/4">
        課程內容
      </div>
      <ul className="grid md:grid-cols-3 grid-cols-2 gap-x-8 gap-y-4 px-[15px] py-[30px] font-bold">
        {course?.content.map((item, index) => (
          <li
            key={`content_${index}`}
            style={diamondStyles}
            className="before-circle text-[#6d4a2f] text-base leading-[1.6]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="flex items-center md:py-[40px] py-[20px] border-b-1">
      <div className="bg-[#c3a76c] rounded-[5px] text-center text-white md:text-xl tracking-wider py-[6px] md:w-1/6 w-1/4">
        課程內容
      </div>
      <div className="text-xl md:ml-[30px] ml-auto font-bold">{course.duration} 分鐘</div>
    </div>
    <div className="flex flex-col md:flex-row md:items-center items-left md:py-[40px] py-[20px] border-b-1 mb-[80px]">
      <div className="bg-[#c3a76c] rounded-[5px] text-center text-white md:text-xl tracking-wider py-[6px] md:w-1/6 w-1/4 mb-[15px] md:mb-0">
        療程價格
      </div>
      <div className="text-xl md:ml-[30px] flex flex-col md:flex-row md:grid-cols-3 md:gap-x-8 md:gap-y-4">
        <div className="flex items-center md:mb-0 mb-[15px]">
          <span className="font-bold mr-[20px]">單堂</span>
          <span>${course.price}</span>
        </div>
        <div className="flex items-center md:px-[20px] md:border-r-1 md:border-l-1 md:mb-0 mb-[15px]">
          <span className="font-bold mr-[20px]">五堂</span>
          <span>${course.price * 5}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-[20px]">十堂</span>
          <span>${course.price * 10}</span>
        </div>
      </div>
    </div>
    <div className="w-full relative bg-[#fff] shadow-md shadow-[0_0_10px_2px_rgba(66,42,23,0.27)] md:h-[200px] h-[150px]">
      <div className="bg-[#c3a76c] rounded-[5px] text-center text-white md:text-xl tracking-wider p-[6px] md:w-1/6 absolute top-[-25px] left-0">
        居家建議
      </div>
      <div className="flex items-center justify-between h-full">
        <div className="w-1/3 text-center flex flex-col items-end md:text-base text-sm md:leading-[1.8]">
        {course.products.map((product, index) => (
            <a
              key={`product_${index}`}
              href={product.link}
              className="md:mb-[12px] mb-[6px] text-[#6d4a2f] hover:text-[#c3a76c] transition-colors"
            >
              {product.productName}
            </a>
        ))}
        </div>
        <div className="img-wrap w-2/3 h-full">
          <img
            src={course.productsImageUrl}
            width={100}
            height={100}
            alt="居家建議"
            className=" w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    <div className="arrow-btn flex items-center mt-[40px] relative cursor-pointer" onClick={backToCategory}>
      <div className="w-[47px] h-[47px] rounded-full bg-[#fff] shadow-[0_0_10px_2px_rgba(66,42,23,0.27)] " />
      <div className="arrow" />
      <div className="ml-[40px]">BACK</div>
    </div>
    </div>  : null
  )
}