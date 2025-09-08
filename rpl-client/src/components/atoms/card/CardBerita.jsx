import "@/style/card-berita.css";
import { FaArrowRightLong } from "react-icons/fa6";

const CardBerita = ({props}) => {
  return (
    <div class="card">
      <div class="card-image">
        <img
          src={props.image}
          alt={props.title}
        />
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span class="card-date">{props.date}</span>
          <span class="card-category">{props.category}</span>
        </div>
        <h2 class="card-title">{props.title}</h2>
        <p class="card-description">
         {props.description}
        </p>
        <div class="card-footer">
          <a href="#" class="read-more-btn">
            Read More
            <FaArrowRightLong className='hidden xl:block xl:w-5 xl:h-5'/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardBerita;
