//스코프 권한 관련 옵션 수정

const scopes = encodeURIComponent(
  'publicData esi-calendar.read_calendar_events.v1 esi-search.search_structures.v1 esi-clones.read_clones.v1 esi-corporations.read_corporation_membership.v1 esi-planets.manage_planets.v1 esi-fleets.read_fleet.v1 esi-corporations.read_structures.v1 esi-characters.read_chat_channels.v1 esi-characters.read_agents_research.v1 esi-industry.read_character_jobs.v1 esi-characters.read_blueprints.v1 esi-location.read_online.v1 esi-contracts.read_character_contracts.v1 esi-clones.read_implants.v1 esi-corporations.track_members.v1 esi-characters.read_notifications.v1 esi-contracts.read_corporation_contracts.v1 esi-corporations.read_starbases.v1 esi-alliances.read_contacts.v1'
);


export default scopes;

/**
 * ESI 권한 스코프

1. esi-plants.manage_plants.v1
유저의 PI 목록과 세부 정보를 읽을 수 있음
2.publicData
공개 데이터에 대한 엑세스
3.esi-charactgers.read_agents_research.v1
캐릭터의 리서치 상태를 읽을 수 있음
4.esi-characters.read_blueprints.v1
캐릭터의 블루프린트를 읽을 수 있음
5.esi-calendar.read_calendar_events.v1
기업 이벤트와 캐릭터의 달력을 읽을 수 있음
6.esi-contracts.read_character_contracts
캐릭터의 컨트랙을 읽을 수 있음
7.esi-location.read_online.v1
캐릭터의 온라인 상태를 읽을 수 있음
8.esi-corperations.read_starbases.v1
캐릭터가 역할이 있는 경우,스타베이스(POS)정보를 읽을 수 있도록 허용
9.esi-corporations.read_structures.v1
기업의 건물 정보를 읽을 수 있음
10.esi-search.search_structures.v1
캐릭터가 스트럭쳐 브라우저에서 볼 수 있는 모든 스트럭쳐를 검색할 수 있음

-I NEED MORE EXOTIC CODING SLAVE
 */
