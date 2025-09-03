import '../../../style/berita-section.css';
import { FaArrowRightLong } from "react-icons/fa6";
import CardBerita from "../../atoms/CardBerita";

const BeritaTerbaruSection = () => {
  const dataBerita = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ini Namanya Berita 1",
      date: "1 Januari 2023",
      category: "Pendidikan",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repellat.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ini Namanya Berita 1",
      date: "1 Januari 2023",
      category: "Pendidikan",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repellat.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ini Namanya Berita 1",
      date: "1 Januari 2023",
      category: "Pendidikan",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repellat.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ini Namanya Berita 1",
      date: "1 Januari 2023",
      category: "Pendidikan",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repellat.",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ini Namanya Berita 1",
      date: "1 Januari 2023",
      category: "Pendidikan",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repellat.",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ini Namanya Berita 1",
      date: "1 Januari 2023",
      category: "Pendidikan",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repellat.",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ini Namanya Berita 1",
      date: "1 Januari 2023",
      category: "Pendidikan",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repellat.",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ini Namanya Berita 1",
      date: "1 Januari 2023",
      category: "Pendidikan",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repellat.",
    },
  ];
  return (
    <section class="berita-terbaru">
      <div class="wrapp-berita-dan-tombol">
        <h1>Berita Terbaru</h1>
        <a href="semua-berita.html" class="tombol-berita">
          Lihat Semua Berita{" "} < FaArrowRightLong className='hidden xl:block xl:w-5 xl:h-5'/>
        </a>
      </div>
      <div class="grid-berita">
        {dataBerita.map((item) => (
          <CardBerita key={item.id} props={item} />
        ))}
      </div>
    </section>
  );
};

export default BeritaTerbaruSection;
