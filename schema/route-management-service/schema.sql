--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Debian 17.5-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bus (
    capacity integer NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    id uuid NOT NULL,
    operator_id uuid NOT NULL,
    created_by character varying(255),
    model character varying(255),
    ntc_registration_number character varying(255) NOT NULL,
    plate_number character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    updated_by character varying(255),
    facilities jsonb,
    CONSTRAINT bus_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'inactive'::character varying, 'cancelled'::character varying])::text[])))
);


--
-- Name: bus_passenger_service_permit_assignment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bus_passenger_service_permit_assignment (
    end_date date,
    start_date date NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    bus_id uuid NOT NULL,
    id uuid NOT NULL,
    passenger_service_permit_id uuid NOT NULL,
    created_by character varying(255),
    request_status character varying(255),
    status character varying(255) NOT NULL,
    updated_by character varying(255),
    CONSTRAINT bus_passenger_service_permit_assignment_request_status_check CHECK (((request_status)::text = ANY ((ARRAY['PENDING'::character varying, 'ACCEPTED'::character varying, 'REJECTED'::character varying])::text[]))),
    CONSTRAINT bus_passenger_service_permit_assignment_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'inactive'::character varying, 'cancelled'::character varying])::text[])))
);


--
-- Name: operator; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.operator (
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    id uuid NOT NULL,
    created_by character varying(255),
    name character varying(255) NOT NULL,
    operator_type character varying(255) NOT NULL,
    region character varying(255),
    status character varying(255) NOT NULL,
    updated_by character varying(255),
    CONSTRAINT operator_operator_type_check CHECK (((operator_type)::text = ANY ((ARRAY['PRIVATE'::character varying, 'CTB'::character varying])::text[]))),
    CONSTRAINT operator_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'inactive'::character varying, 'cancelled'::character varying])::text[])))
);


--
-- Name: passenger_service_permit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.passenger_service_permit (
    expiry_date date,
    issue_date date NOT NULL,
    maximum_bus_assigned integer NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    id uuid NOT NULL,
    operator_id uuid NOT NULL,
    route_group_id uuid NOT NULL,
    created_by character varying(255),
    permit_number character varying(255) NOT NULL,
    permit_type character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    updated_by character varying(255),
    CONSTRAINT passenger_service_permit_permit_type_check CHECK (((permit_type)::text = ANY ((ARRAY['NORMAL'::character varying, 'SEMI_LUXURY'::character varying, 'LUXURY'::character varying, 'EXTRA_LUXURY_NORMALWAY'::character varying, 'EXTRA_LUXURY_HIGHWAY'::character varying])::text[]))),
    CONSTRAINT passenger_service_permit_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'inactive'::character varying, 'cancelled'::character varying])::text[])))
);


--
-- Name: route; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.route (
    distance_km double precision,
    estimated_duration_minutes integer,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    end_stop_id uuid,
    id uuid NOT NULL,
    route_group_id uuid,
    start_stop_id uuid,
    created_by character varying(255),
    description character varying(255),
    direction character varying(255),
    name character varying(255) NOT NULL,
    updated_by character varying(255),
    CONSTRAINT route_direction_check CHECK (((direction)::text = ANY ((ARRAY['OUTBOUND'::character varying, 'INBOUND'::character varying])::text[])))
);


--
-- Name: route_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.route_group (
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    id uuid NOT NULL,
    created_by character varying(255),
    description character varying(255),
    name character varying(255) NOT NULL,
    updated_by character varying(255)
);


--
-- Name: route_stop; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.route_stop (
    distance_from_start_km double precision,
    stop_order integer NOT NULL,
    id uuid NOT NULL,
    route_id uuid NOT NULL,
    stop_id uuid NOT NULL
);


--
-- Name: schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedule (
    effective_end_date date,
    effective_start_date date NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    id uuid NOT NULL,
    route_id uuid NOT NULL,
    created_by character varying(255),
    description character varying(255),
    name character varying(255) NOT NULL,
    schedule_type character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    updated_by character varying(255),
    CONSTRAINT schedule_schedule_type_check CHECK (((schedule_type)::text = ANY ((ARRAY['REGULAR'::character varying, 'SPECIAL'::character varying])::text[]))),
    CONSTRAINT schedule_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'ACTIVE'::character varying, 'INACTIVE'::character varying, 'CANCELLED'::character varying])::text[])))
);


--
-- Name: schedule_calendar; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedule_calendar (
    friday boolean NOT NULL,
    monday boolean NOT NULL,
    saturday boolean NOT NULL,
    sunday boolean NOT NULL,
    thursday boolean NOT NULL,
    tuesday boolean NOT NULL,
    wednesday boolean NOT NULL,
    id uuid NOT NULL,
    schedule_id uuid NOT NULL
);


--
-- Name: schedule_exception; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedule_exception (
    exception_date date NOT NULL,
    id uuid NOT NULL,
    schedule_id uuid NOT NULL,
    exception_type character varying(255) NOT NULL,
    CONSTRAINT schedule_exception_exception_type_check CHECK (((exception_type)::text = ANY ((ARRAY['ADDED'::character varying, 'REMOVED'::character varying])::text[])))
);


--
-- Name: schedule_stop; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedule_stop (
    arrival_time time(6) without time zone,
    departure_time time(6) without time zone,
    stop_order integer NOT NULL,
    id uuid NOT NULL,
    route_stop_id uuid NOT NULL,
    schedule_id uuid NOT NULL
);


--
-- Name: stop; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stop (
    is_accessible boolean,
    latitude double precision,
    longitude double precision,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    id uuid NOT NULL,
    address character varying(255),
    city character varying(255),
    country character varying(255),
    created_by character varying(255),
    description character varying(255),
    name character varying(255) NOT NULL,
    state character varying(255),
    updated_by character varying(255),
    zip_code character varying(255)
);


--
-- Name: trip; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.trip (
    actual_arrival_time time(6) without time zone,
    actual_departure_time time(6) without time zone,
    scheduled_arrival_time time(6) without time zone NOT NULL,
    scheduled_departure_time time(6) without time zone NOT NULL,
    trip_date date NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    bus_id uuid,
    conductor_id uuid,
    driver_id uuid,
    id uuid NOT NULL,
    passenger_service_permit_id uuid,
    schedule_id uuid NOT NULL,
    created_by character varying(255),
    notes character varying(255),
    status character varying(255) NOT NULL,
    updated_by character varying(255),
    CONSTRAINT trip_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'completed'::character varying, 'cancelled'::character varying, 'delayed'::character varying, 'in_transit'::character varying, 'boarding'::character varying, 'departed'::character varying])::text[])))
);


--
-- Name: bus bus_ntc_registration_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT bus_ntc_registration_number_key UNIQUE (ntc_registration_number);


--
-- Name: bus_passenger_service_permit_assignment bus_passenger_service_permit_assignment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bus_passenger_service_permit_assignment
    ADD CONSTRAINT bus_passenger_service_permit_assignment_pkey PRIMARY KEY (id);


--
-- Name: bus bus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT bus_pkey PRIMARY KEY (id);


--
-- Name: bus bus_plate_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT bus_plate_number_key UNIQUE (plate_number);


--
-- Name: operator operator_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.operator
    ADD CONSTRAINT operator_pkey PRIMARY KEY (id);


--
-- Name: passenger_service_permit passenger_service_permit_permit_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.passenger_service_permit
    ADD CONSTRAINT passenger_service_permit_permit_number_key UNIQUE (permit_number);


--
-- Name: passenger_service_permit passenger_service_permit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.passenger_service_permit
    ADD CONSTRAINT passenger_service_permit_pkey PRIMARY KEY (id);


--
-- Name: route_group route_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_group
    ADD CONSTRAINT route_group_pkey PRIMARY KEY (id);


--
-- Name: route route_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT route_pkey PRIMARY KEY (id);


--
-- Name: route_stop route_stop_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_stop
    ADD CONSTRAINT route_stop_pkey PRIMARY KEY (id);


--
-- Name: schedule_calendar schedule_calendar_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule_calendar
    ADD CONSTRAINT schedule_calendar_pkey PRIMARY KEY (id);


--
-- Name: schedule_exception schedule_exception_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule_exception
    ADD CONSTRAINT schedule_exception_pkey PRIMARY KEY (id);


--
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (id);


--
-- Name: schedule_stop schedule_stop_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule_stop
    ADD CONSTRAINT schedule_stop_pkey PRIMARY KEY (id);


--
-- Name: stop stop_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stop
    ADD CONSTRAINT stop_pkey PRIMARY KEY (id);


--
-- Name: trip trip_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_pkey PRIMARY KEY (id);


--
-- Name: trip fk7miyoext6mxl6q72hl495csot; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT fk7miyoext6mxl6q72hl495csot FOREIGN KEY (schedule_id) REFERENCES public.schedule(id);


--
-- Name: schedule_stop fkgnwo6bqdu7m14ayoudvv4uesj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule_stop
    ADD CONSTRAINT fkgnwo6bqdu7m14ayoudvv4uesj FOREIGN KEY (route_stop_id) REFERENCES public.route_stop(id);


--
-- Name: bus_passenger_service_permit_assignment fkhbec0j9k95ty2vfoucfw8264q; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bus_passenger_service_permit_assignment
    ADD CONSTRAINT fkhbec0j9k95ty2vfoucfw8264q FOREIGN KEY (bus_id) REFERENCES public.bus(id);


--
-- Name: schedule_calendar fkmfwet6s1f20mcqbhm3ugqhwd8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule_calendar
    ADD CONSTRAINT fkmfwet6s1f20mcqbhm3ugqhwd8 FOREIGN KEY (schedule_id) REFERENCES public.schedule(id);


--
-- Name: route_stop fkmu1b9fkhu2d4982t14wc4wjg9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_stop
    ADD CONSTRAINT fkmu1b9fkhu2d4982t14wc4wjg9 FOREIGN KEY (stop_id) REFERENCES public.stop(id);


--
-- Name: passenger_service_permit fkn2t1j7v9e0c5jq712xsnku27r; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.passenger_service_permit
    ADD CONSTRAINT fkn2t1j7v9e0c5jq712xsnku27r FOREIGN KEY (route_group_id) REFERENCES public.route_group(id);


--
-- Name: schedule_exception fknf1779yhwwyett4swexly6cxw; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule_exception
    ADD CONSTRAINT fknf1779yhwwyett4swexly6cxw FOREIGN KEY (schedule_id) REFERENCES public.schedule(id);


--
-- Name: schedule fknijrqlnbae9vvpgj6pnaqrl0q; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT fknijrqlnbae9vvpgj6pnaqrl0q FOREIGN KEY (route_id) REFERENCES public.route(id);


--
-- Name: route fko071ncgg9k5lfwuctn67sniok; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT fko071ncgg9k5lfwuctn67sniok FOREIGN KEY (route_group_id) REFERENCES public.route_group(id);


--
-- Name: trip fkptvi61dd1hao1yig3in0gvcjs; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT fkptvi61dd1hao1yig3in0gvcjs FOREIGN KEY (bus_id) REFERENCES public.bus(id);


--
-- Name: route_stop fkrah0j8khs716aqhsqt3x5yxbw; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_stop
    ADD CONSTRAINT fkrah0j8khs716aqhsqt3x5yxbw FOREIGN KEY (route_id) REFERENCES public.route(id);


--
-- Name: bus fksnxwbj6jnm1dd91ypmyusdhmi; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT fksnxwbj6jnm1dd91ypmyusdhmi FOREIGN KEY (operator_id) REFERENCES public.operator(id);


--
-- Name: bus_passenger_service_permit_assignment fkstmsu7pc5eottoc0kg07lglct; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bus_passenger_service_permit_assignment
    ADD CONSTRAINT fkstmsu7pc5eottoc0kg07lglct FOREIGN KEY (passenger_service_permit_id) REFERENCES public.passenger_service_permit(id);


--
-- Name: schedule_stop fktrm4cvjbjkh19287mlaa63l9p; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule_stop
    ADD CONSTRAINT fktrm4cvjbjkh19287mlaa63l9p FOREIGN KEY (schedule_id) REFERENCES public.schedule(id);


--
-- Name: trip fkvih88rejkgngrds5dtugwdt7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT fkvih88rejkgngrds5dtugwdt7 FOREIGN KEY (passenger_service_permit_id) REFERENCES public.passenger_service_permit(id);


--
-- Name: passenger_service_permit fkxqrklsq3h0e6kk9i1oh1frqd; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.passenger_service_permit
    ADD CONSTRAINT fkxqrklsq3h0e6kk9i1oh1frqd FOREIGN KEY (operator_id) REFERENCES public.operator(id);


--
-- PostgreSQL database dump complete
--

