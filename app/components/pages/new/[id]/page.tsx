import { pagesData as data } from "@/data/data.website";
import "../../../../styles/scss/pages/new/index.scss";
import Link from "next/link";

const New = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const item = data.news.newPoints.find((item) => item.id === id);
  if (!item) return <div>Not found</div>;

  const otherItems = data.news.newPoints.filter((item) => item.id !== id);
  
  return (
    <section id="new">
      <div className="new">
        <div className="new-block">
          <div className="new-header">
            <Link href="/components/pages/news">назад</Link>
            <h3>{item.title}</h3>
          </div>
          <div className="new-item">
            <p>{item.content}</p>
          </div>
        </div>
        <div className="news-meta">
          <h3>Другие новости</h3>
          {
            otherItems.map((item, index) => (
              <div className="new-another-item" key={index}>
                <Link href={`/components/pages/new/${item.id}`}>{item.title}</Link>
              </div>
            ))
          }
          <Link href="/components/pages/news" className="new-footer">Смотреть все новости</Link>
        </div>
      </div>
    </section>
  )
}

export default New;