--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

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
-- Name: ranking; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ranking (
    id integer NOT NULL,
    user_id integer,
    links_count integer DEFAULT 0,
    visit_count integer DEFAULT 0,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: ranking_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ranking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ranking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ranking_id_seq OWNED BY public.ranking.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    original_url character varying(2000) NOT NULL,
    short_url character varying(10) NOT NULL,
    visitors integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    user_id integer NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ranking id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ranking ALTER COLUMN id SET DEFAULT nextval('public.ranking_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ranking; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'abbb323b-5b82-494c-82be-6bdae2a6914b', 2, '2023-08-04 22:43:28.158913');
INSERT INTO public.sessions VALUES (2, 'df0685ee-de11-431f-badb-b3b6c62cec32', 2, '2023-08-04 22:56:22.081928');
INSERT INTO public.sessions VALUES (3, '8b1a6695-833f-42cc-92ca-9e32cd661ac7', 2, '2023-08-05 00:06:33.427441');
INSERT INTO public.sessions VALUES (4, '39771c77-603b-4b5a-b2c6-000e2a4431b1', 2, '2023-08-05 00:40:28.586755');
INSERT INTO public.sessions VALUES (5, '9c432633-b0e1-43ab-bfd3-dbd162c0a91c', 2, '2023-08-05 23:17:06.359427');
INSERT INTO public.sessions VALUES (6, '265e2fb4-b2b1-4007-9e88-f174e702926a', 5, '2023-08-06 00:25:08.857462');
INSERT INTO public.sessions VALUES (7, '2b965ed4-79c5-4864-b0f3-9bce3d7fe948', 2, '2023-08-06 18:12:46.408856');
INSERT INTO public.sessions VALUES (8, '3178f559-d7b8-4e02-a3fd-75a1ead4d233', 5, '2023-08-06 21:13:19.624412');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (12, 'https://facecheck.id/', 'JWpscuM', 0, '2023-08-05 23:49:17.182752', 2);
INSERT INTO public.urls VALUES (13, 'https://facecheck.id/', 'V49hYS_', 0, '2023-08-05 23:49:17.32679', 2);
INSERT INTO public.urls VALUES (14, 'https://facecheck.id/', 'DMqJhm-', 0, '2023-08-05 23:49:17.47696', 2);
INSERT INTO public.urls VALUES (15, 'https://facecheck.id/', 'REgiAnl', 0, '2023-08-05 23:49:17.627607', 2);
INSERT INTO public.urls VALUES (9, 'https://facecheck.id/', 'J_j__C0', 5, '2023-08-05 23:49:11.033247', 2);
INSERT INTO public.urls VALUES (10, 'https://facecheck.id/', 'ugxIumN', 7, '2023-08-05 23:49:16.493356', 2);
INSERT INTO public.urls VALUES (16, 'https://www.youtube.com/', 'c4C1Ndl', 0, '2023-08-06 21:13:52.813781', 2);
INSERT INTO public.urls VALUES (11, 'https://facecheck.id/', 'aYdalc7', 10, '2023-08-05 23:49:17.019544', 2);
INSERT INTO public.urls VALUES (17, 'https://www.youtube.com/', 'kGH0Q_p', 0, '2023-08-06 21:16:23.340645', 5);
INSERT INTO public.urls VALUES (18, 'https://www.youtube.com/', 'BnAbPQs', 0, '2023-08-06 22:00:08.779235', 5);
INSERT INTO public.urls VALUES (19, 'https://www.youtube.com/', '_oG3QqY', 0, '2023-08-06 22:00:09.377154', 5);
INSERT INTO public.urls VALUES (21, 'https://www.youtube.com/', 'gs5xWqA', 0, '2023-08-06 22:00:09.721967', 5);
INSERT INTO public.urls VALUES (20, 'https://www.youtube.com/', 'J7uPbqM', 6, '2023-08-06 22:00:09.545335', 5);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '{}', '2023-08-04 22:11:12.525903');
INSERT INTO public.users VALUES (2, 'João2', 'joao@driven2.com.br', '$2b$10$9N7YusSj2kMkkUSG5mv9WuEV0lOG9PlsSqEZhpWOqzGkZkmyks6V2', '2023-08-04 22:14:12.225074');
INSERT INTO public.users VALUES (3, 'João2', 'joao@driven3.com.br', '$2b$10$U0tubsV25ygRunMMjXVlB.nMJXHJEdwgx5NfsVpqTuk07MPQENjYa', '2023-08-04 22:56:11.470015');
INSERT INTO public.users VALUES (4, 'João2', 'joao@driven4.com.br', '$2b$10$tp9hkk4CoKxJxZ002DWlmeSm2QGkw4liUwA91hBecxCVqn9nwFPLu', '2023-08-04 22:57:58.918294');
INSERT INTO public.users VALUES (5, 'Mario', 'mario@driven.com.br', '$2b$10$hllp4qnWj4mGimBIgKjqRuIwY2NNRy9P2E1E1l.e6qgCa1R8Sv17u', '2023-08-06 00:24:35.500609');


--
-- Name: ranking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ranking_id_seq', 1, false);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 8, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 21, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: ranking ranking_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ranking
    ADD CONSTRAINT ranking_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_short_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_short_url_key UNIQUE (short_url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ranking ranking_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ranking
    ADD CONSTRAINT ranking_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

