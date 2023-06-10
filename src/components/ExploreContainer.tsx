import {
  IonImg,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
// import { PagePage, Section } from "@oa998/test-types";
import { useCallback, useEffect, useState } from "react";
import "./ExploreContainer.css";

export enum Section {
  SUBTITLE = "subtitle",
  PARAGRAPH = "paragraph",
  IMAGE = "image",
}

export type PagePage = {
  title: string;
  sections: (
    | {
        section: Section.SUBTITLE;
        subtitle: string;
      }
    | {
        section: Section.PARAGRAPH;
        para: string;
      }
    | {
        section: Section.IMAGE;
        image: string;
      }
  )[];
};

const ExploreContainer: React.FC = () => {
  const [data, setData] = useState<PagePage>({
    title: "Hello There!",
    sections: [],
  });

  const handleRefresh = useCallback(
    (event?: CustomEvent<RefresherEventDetail>) => {
      fetch("https://dummyjson.com/products/1")
        .then((r) => r.json())
        .then((r) => {
          r.random = Math.random();
          setData({
            title: Math.random() + "",
            sections: [
              {
                section: Section.PARAGRAPH,
                para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              {
                section: Section.PARAGRAPH,
                para: "Dignissim sodales ut eu sem integer vitae. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Egestas congue quisque egestas diam in arcu cursus. Eget nullam non nisi est sit amet facilisis magna.",
              },
              {
                section: Section.IMAGE,
                image: "https://i.dummyjson.com/data/products/1/2.jpg",
              },
              { section: Section.SUBTITLE, subtitle: "just a subtitle!" },
              {
                section: Section.IMAGE,
                image: "https://i.dummyjson.com/data/products/1/2.jpg",
              },
              {
                section: Section.PARAGRAPH,
                para: "Dignissim sodales ut eu sem integer vitae. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Egestas congue quisque egestas diam in arcu cursus. Eget nullam non nisi est sit amet facilisis magna.",
              },
              {
                section: Section.PARAGRAPH,
                para: "Dignissim sodales ut eu sem integer vitae. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Egestas congue quisque egestas diam in arcu cursus. Eget nullam non nisi est sit amet facilisis magna.",
              },
              {
                section: Section.PARAGRAPH,
                para: "Dignissim sodales ut eu sem integer vitae. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Egestas congue quisque egestas diam in arcu cursus. Eget nullam non nisi est sit amet facilisis magna.",
              },
            ],
          });
        })
        .then(() => event?.detail?.complete());
      // event?.detail?.complete();
    },
    []
  );

  useEffect(() => handleRefresh(), [handleRefresh]);

  function getContent(s: PagePage["sections"][number]) {
    switch (s.section) {
      case Section.SUBTITLE:
        return <div className='subtitle'>{s.subtitle}</div>;
      case Section.PARAGRAPH:
        return <div className='paragraph'>{s.para}</div>;
      case Section.IMAGE:
        return (
          <IonImg
            src={s.image}
            alt='The Wisconsin State Capitol building in Madison, WI at night'
          />
        );
      default:
        return <p>unknown</p>;
    }
  }

  return (
    <div className='container'>
      <IonRefresher slot='fixed' onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <div className='title'>{data.title}</div>
      {/* <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p> */}
      <div className='flex'>{data.sections.map((s) => getContent(s))}</div>
    </div>
  );
};

export default ExploreContainer;
