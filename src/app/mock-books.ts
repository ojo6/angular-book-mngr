import { IBook } from './interfaces/book-interface';

export const BOOKS: IBook[] = [
  {
    id: 11,
    name: 'The Great Gatsby',
    description: `<p><strong>The Great Gatsby</strong> is a novel by F. Scott Fitzgerald, set in the Jazz Age. It explores themes of <strong>decadence</strong> and <strong>idealism</strong> through <strong>Nick Carraway's</strong> encounters with the enigmatic <strong>Jay Gatsby</strong>.</p>
    <p>With insightful prose, Fitzgerald portrays a world of social upheaval and excess, where characters pursue dreams that ultimately lead to disillusionment.</p>
    <ul>
      <li>The novel reflects the societal changes and moral decay of the 1920s.</li>
      <li>Fitzgerald's rich symbolism and vivid imagery immerse readers in the extravagant world of the American Dream.</li>
    </ul>`,
    author: 'F. Scott Fitzgerald',
    rating: 4,
    bookWebsiteUrl: 'https://en.wikipedia.org/wiki/The_Great_Gatsby',
    numberOfPages: 180,
    printDate: new Date('April 10, 1925'),
    totalNumberOfBooks: 43,
  },
  {
    id: 12,
    name: 'To Kill a Mockingbird',
    description: `<p><strong>To Kill a Mockingbird</strong> by Harper Lee is a Pulitzer Prize-winning novel. Set in Alabama, it intertwines themes of <strong>racial injustice</strong> with the innocence of childhood.</p>
    <p>Through <strong>Scout Finch's</strong> eyes, Lee offers a poignant portrayal of societal issues, illustrating the complexities of human morality and the importance of empathy.</p>
    <ul>
      <li>The novel challenges racial prejudice and the concept of 'otherness'.</li>
      <li>Lee's use of Southern Gothic elements adds depth to the narrative, capturing the essence of the Deep South.</li>
    </ul>`,
    author: 'Harper Lee',
    rating: 4,
    bookWebsiteUrl: 'https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird',
    numberOfPages: 281,
    printDate: new Date('July 11, 1960'),
    totalNumberOfBooks: 5,
  },
  {
    id: 13,
    name: '1984',
    description: `<p><strong>1984</strong> by George Orwell is a dystopian masterpiece. Set in Airstrip One, it delves into themes of <strong>totalitarianism</strong> and government surveillance, presenting a chilling vision of a controlled society.</p>
    <p>Orwell's portrayal of <strong>Winston Smith's</strong> struggle against oppression is a stark warning about the dangers of authoritarianism and the erosion of individual freedom.</p>
    <ul>
      <li>The novel explores the manipulation of truth and the power of propaganda.</li>
      <li>Orwell's bleak depiction of a surveillance state remains relevant in today's age of technology.</li>
    </ul>`,
    author: 'George Orwell',
    rating: 5,
    bookWebsiteUrl: 'https://en.wikipedia.org/wiki/Nineteen_Eighty-Four',
    numberOfPages: 328,
    printDate: new Date('June 8, 1949'),
    totalNumberOfBooks: 44,
  },
  {
    id: 14,
    name: 'The Catcher in the Rye',
    description: `<p><strong>The Catcher in the Rye</strong> by J.D. Salinger captures teenage angst and rebellion. Through <strong>Holden Caulfield's</strong> journey, Salinger explores themes of identity and loss, offering a raw and honest portrayal of adolescence.</p>
    <p>The novel remains a timeless reflection of the struggles of growing up and the search for authenticity in a conformist society.</p>`,
    author: 'J.D. Salinger',
    rating: 3,
    bookWebsiteUrl: 'https://en.wikipedia.org/wiki/The_Catcher_in_the_Rye',
    numberOfPages: 224,
    printDate: new Date('July 16, 1951'),
    totalNumberOfBooks: 12,
  },
  {
    id: 15,
    name: 'Pride and Prejudice',
    description: `<p><strong>Pride and Prejudice</strong> by Jane Austen is a timeless romance. It follows <strong>Elizabeth Bennet's</strong> journey through Regency-era England, navigating issues of love and societal expectations with wit and grace.</p>
    <p>Austen's keen observations of human nature and sharp social commentary make this novel a classic portrayal of the complexities of relationships and the pursuit of happiness.</p>`,
    author: 'Jane Austen',
    rating: 2,
    bookWebsiteUrl: 'https://en.wikipedia.org/wiki/Pride_and_Prejudice',
    numberOfPages: 279,
    printDate: new Date('January 28, 1813'),
    totalNumberOfBooks: 7,
  },
  {
    id: 16,
    name: 'Albinuța',
    author: 'Grigore Vieru',
    description: `<p>“Albinuța” (The Little Bee) is a beloved children's poem by Grigore Vieru. It whimsically portrays the adventures of a little bee as it spreads joy among flowers, celebrating the wonders of nature and the innocence of childhood.</p>
    <p>Vieru's lyrical language and vivid imagery capture the imagination, making this poem a timeless treasure for readers of all ages.</p>`,
    rating: 5,
    bookWebsiteUrl: 'https://ro.wikipedia.org/wiki/Grigore_Vieru',
    numberOfPages: 12,
    printDate: new Date('January 1, 1972'),
    totalNumberOfBooks: 5,
  },
  {
    id: 17,
    name: 'Franny and Zooey',
    description: `<p><strong>Franny and Zooey</strong> is a book by J.D. Salinger. It comprises two novellas about the members of the Glass family. The first story, "Franny," follows Franny Glass as she struggles with existential questions during a weekend visit to her boyfriend's college. The second story, "Zooey," focuses on Franny's brother Zooey, who tries to offer her guidance and comfort.</p>
    <p>Salinger's signature introspective style and complex characterizations shine in this exploration of spirituality and familial relationships.</p>`,
    author: 'J.D. Salinger',
    rating: 4,
    bookWebsiteUrl: 'https://en.wikipedia.org/wiki/Franny_and_Zooey',
    numberOfPages: 201,
    printDate: new Date('September 1961'),
    totalNumberOfBooks: 8,
  },
  {
    id: 18,
    name: 'Homage to Catalonia',
    description: `<p><strong>Homage to Catalonia</strong> is George Orwell's personal account of his experiences and observations during the Spanish Civil War. Orwell provides a candid depiction of the complexities and contradictions within the Republican faction, offering insights into the political climate and the struggles faced by those fighting against fascism.</p>
    <p>This memoir reflects Orwell's commitment to truth-telling and his unwavering support for democratic ideals, making it a compelling read for those interested in history and political activism.</p>`,
    author: 'George Orwell',
    rating: 4,
    bookWebsiteUrl: 'https://en.wikipedia.org/wiki/Homage_to_Catalonia',
    numberOfPages: 288,
    printDate: new Date('April 25, 1938'),
    totalNumberOfBooks: 15,
  },
  {
    id: 19,
    name: 'Down and Out in Paris and London',
    description: `<p><strong>Down and Out in Paris and London</strong> is a memoir by George Orwell. It recounts Orwell's experiences of poverty and homelessness in both cities during the late 1920s.</p>
    <p>The book provides a raw and honest portrayal of the struggles faced by the working class, shedding light on the harsh realities of life on the margins of society.</p>`,
    author: 'George Orwell',
    rating: 4,
    bookWebsiteUrl:
      'https://en.wikipedia.org/wiki/Down_and_Out_in_Paris_and_London',
    numberOfPages: 218,
    printDate: new Date('January 9, 1933'),
    totalNumberOfBooks: 10,
  },
];
