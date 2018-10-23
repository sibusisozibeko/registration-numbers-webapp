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

insert into towns(town_initials, town_reg) values('Cape Town', 'CA');
insert into towns(town_initials, town_reg) values('Bellville', 'CY');
insert into towns(town_initials, town_reg) values('Mamelsberry', 'CK');
