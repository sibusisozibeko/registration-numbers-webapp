DROP TABLE if exists licenceplate, regplates;

create table licenceplate
(
    id serial primary key,
    town_initials text not null,
    town_reg text not null
);

create table regplates
(
    id serial primary key,
    registration_numbers text not null,
    town_id int,
    foreign key (town_id) references licenceplate(id)
);

insert into licenceplate(town_reg, town_initials) values('Cape Town', 'CA');
insert into licenceplate(town_reg, town_initials) values('Bellville', 'CY');
insert into licenceplate(town_reg, town_initials) values('Malmesbury', 'CK');
