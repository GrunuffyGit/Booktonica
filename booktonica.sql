--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    name text NOT NULL,
    date_of_death date,
    homepage text,
    headshot_url text,
    date_of_birth date
);


ALTER TABLE public.authors OWNER TO tpl1219_2;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authors_id_seq OWNER TO tpl1219_2;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: book_list; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.book_list (
    id integer NOT NULL,
    name character varying(30),
    description character varying(30),
    created_by integer,
    created_on date
);


ALTER TABLE public.book_list OWNER TO tpl1219_2;

--
-- Name: book_list_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.book_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_list_id_seq OWNER TO tpl1219_2;

--
-- Name: book_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.book_list_id_seq OWNED BY public.book_list.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title text NOT NULL,
    publication_date date,
    author_id integer NOT NULL,
    cover_image_url text,
    summary text,
    subtitle text
);


ALTER TABLE public.books OWNER TO tpl1219_2;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO tpl1219_2;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: books_in_list; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.books_in_list (
    id integer NOT NULL,
    book_list_id integer,
    book_id integer,
    created_on date
);


ALTER TABLE public.books_in_list OWNER TO tpl1219_2;

--
-- Name: books_in_list_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.books_in_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_in_list_id_seq OWNER TO tpl1219_2;

--
-- Name: books_in_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.books_in_list_id_seq OWNED BY public.books_in_list.id;


--
-- Name: user_log; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.user_log (
    logged_in integer
);


ALTER TABLE public.user_log OWNER TO tpl1219_2;

--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1219_2
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30),
    password character varying(30)
);


ALTER TABLE public.users OWNER TO tpl1219_2;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1219_2
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tpl1219_2;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1219_2
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: book_list id; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.book_list ALTER COLUMN id SET DEFAULT nextval('public.book_list_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: books_in_list id; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.books_in_list ALTER COLUMN id SET DEFAULT nextval('public.books_in_list_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.authors (id, name, date_of_death, homepage, headshot_url, date_of_birth) FROM stdin;
2	Anna Wiener	\N	https://www.annawiener.com/	https://images.gr-assets.com/authors/1569785505p8/3948574.jpg	\N
3	Sarah Andersen	\N	http://sarahcandersen.com/	https://images.gr-assets.com/authors/1450904865p8/14144506.jpg	\N
5	Phoebe Robinson	\N	http://www.phoeberobinson.com/	https://images.gr-assets.com/authors/1479071142p8/15080033.jpg	\N
6	 Caroline Criado-Pérez\n	\N	https://www.carolinecriadoperez.com/	https://static.wixstatic.com/media/96f7da_de9fec69b5c0447592d5c80c8202a2df~mv2.png/v1/crop/x_0,y_75,w_570,h_709/fill/w_444,h_552,al_c,q_85,usm_0.66_1.00_0.01/Screen%20Shot%202018-04-23%20at%2015_07_47.webp	1984-06-01
7	 Ottessa Moshfegh\n	\N	https://en.wikipedia.org/wiki/Ottessa_Moshfegh	https://api.time.com/wp-content/uploads/2018/07/moshfegh-ottessa-author-my-last-year-of-rest-and-relaxation.jpg?w=686&quality=85	1981-05-20
4	Alison Bechdel	\N	http://www.dykestowatchoutfor.com/	https://images.gr-assets.com/authors/1245100306p8/21982.jpg	1960-09-10
\.


--
-- Data for Name: book_list; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.book_list (id, name, description, created_by, created_on) FROM stdin;
1	testList	testing	1	2020-03-12
2	testList2	testing2	1	2020-03-12
5	Ducky's Special Read	Books to share with Ducky!	4	2020-03-27
6	Want List	\N	4	2020-03-27
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.books (id, title, publication_date, author_id, cover_image_url, summary, subtitle) FROM stdin;
9	Homesick for Another World 	2017-01-17	7	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1469408007l/30079724.jpg	There's something eerily unsettling about Ottessa Moshfegh's stories, something almost dangerous, while also being delightful, and even laugh-out-loud funny. Her characters are all unsteady on their feet in one way or another; they all yearn for connection and betterment, though each in very different ways, but they are often tripped up by their own baser impulses and existential insecurities.	\N
1	Uncanny Valley	2020-02-14	2	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1559568004l/45186565.jpg	In her mid-twenties, at the height of tech industry idealism, Anna Wienerstuck, broke, and looking for meaning in her work, like any good millennial--left a job in book publishing for the promise of the new digital economy.	A Memoir
8	Invisible Women	2019-03-12	6	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1550780394l/44083621._SY475_.jpg	Data is fundamental to the modern world. From economic development, to healthcare, to education and public policy, we rely on numbers to allocate resources and make crucial decisions. But because so much data fails to take into account gender, because it treats men as the default and women as atypical, bias and discrimination are baked into our systems. And women pay tremendous costs for this bias, in time, money, and often with their lives.	Data Bias in a World Designed for Men 
6	Herding Cats 	2018-03-27	3	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522799608l/35924705._SX318_.jpg	Adjusting to life as a world-famous cartoonist isn't easy. Terrifying deadlines, piles of junk-food wrappers under a glowing computer screen, and an ever-growing horde of pets....umm, never mind--it's pretty much the same.	\N
2	Fun Home	2007-06-05	4	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1440097020l/26135825._SY475_.jpg	In this graphic memoir, Alison Bechdel charts her fraught relationship with her late father.	A Family Tragicomic 
3	You Can't Touch My Hair	2016-10-04	5	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1477907975l/29496435._SY475_.jpg	A hilarious and affecting essay collection about race, gender, and pop culture from celebrated stand-up comedian and WNYC podcaster Phoebe Robinson.	And Other Things I Still Have to Explain
7	 Everything's Trash, But It's Okay 	2018-10-16	5	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1527080689l/38649805.jpg	Robinson's latest essay collection is a call to arms. She tackles a wide range of topics, such as giving feminism a tough-love talk in hopes it can become more intersectional; telling society's beauty standards to kick rocks; and demanding that toxic masculinity close its mouth and legs (enough with the manspreading already!), and get out of the way so true progress can happen.	\N
5	Adulthood Is a Myth 	2016-03-08	3	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1481219756l/25855506._SX318_.jpg	Are you a special snowflake?\nDo you enjoy networking to advance your career?\nIs adulthood an exciting new challenge for which you feel fully prepared?\n\nUgh. Please go away.	\N
4	Big Mushy Happy Lump	2017-03-07	3	https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490071048l/30754980._SX318_.jpg	Sarah Andersen's second comics collection picks up right where the first left off - huddled under a pile of blankets avoiding the responsibilities of the real world.	\N
\.


--
-- Data for Name: books_in_list; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.books_in_list (id, book_list_id, book_id, created_on) FROM stdin;
3	1	4	2020-03-20
4	2	5	2020-03-20
6	2	7	2020-03-21
7	2	7	2020-03-19
8	5	4	2020-03-27
9	5	7	2020-03-27
10	5	8	2020-03-27
\.


--
-- Data for Name: user_log; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.user_log (logged_in) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1219_2
--

COPY public.users (id, username, password) FROM stdin;
1	testUSER	testPass
2	apiUserTEST	apiPassTEST
3	DUCKY	ducky
4	PEACH	peach
\.


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.authors_id_seq', 7, true);


--
-- Name: book_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.book_list_id_seq', 20, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.books_id_seq', 9, true);


--
-- Name: books_in_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.books_in_list_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1219_2
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: book_list book_list_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.book_list
    ADD CONSTRAINT book_list_pkey PRIMARY KEY (id);


--
-- Name: books_in_list books_in_list_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.books_in_list
    ADD CONSTRAINT books_in_list_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: book_list book_list_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.book_list
    ADD CONSTRAINT book_list_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: books books_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- Name: books_in_list books_in_list_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.books_in_list
    ADD CONSTRAINT books_in_list_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: books_in_list books_in_list_book_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.books_in_list
    ADD CONSTRAINT books_in_list_book_list_id_fkey FOREIGN KEY (book_list_id) REFERENCES public.book_list(id) ON DELETE CASCADE;


--
-- Name: user_log user_log_logged_in_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1219_2
--

ALTER TABLE ONLY public.user_log
    ADD CONSTRAINT user_log_logged_in_fkey FOREIGN KEY (logged_in) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

