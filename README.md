# [캐비닛키] README.md

캐비닛키(CabinetKey)는 자신만의 이야기, 캐릭터, 설정 문서, 관련된 창작물들을 연합우주 내의 Misskey 계정과 연동하여 체계적으로 관리하고 보여주는 정리 도구입니다.

연도에 따른 정리 기능이 있으므로, 주인공들이 나이를 먹지 않는 사자에상 시간선보다는 사극이나 판타지와 같이 시간에 따른 변화를 보여주는 시간선에 알맞습니다.

## 명칭

캐비닛키는 서랍장을 뜻하는 Cabinet과 미스키의 key에서 이름을 땄습니다.

서랍장 속에 고이 저장된 여러분의 자작 캐릭터와 세계관을 보다 편하게 정리할 수 있는 열쇠가 되어 줄 것입니다.

## 기능

다음과 같은 기능들을 갖추고 있습니다.

### 기본 기능

- [x] **Notion-like UI**: 페이지를 넓게 사용하는 UI이며, 새 페이지 로드 시 메인 페이지를 아래에 두고 로드됩니다.
- [x] **json 데이터**: 모든 정보를 하나의 json 포맷의 데이터로 저장합니다.
- [x] **미스키 페이지와의 연동**: 설정에서 명시한 미스키 계정의 `cabinetkey.json` 페이지에서 json 데이터를 불러옵니다. 이 페이지는 최초 로그인 시 자동으로 생성됩니다.
- [x] **json 직접 편집**: 생성된 json 데이터를 직접 편집하실 수 있습니다.
- [ ] **편리한 내용 편집**: 문서들은 미스키 클라이언트가 아닌 캐비닛키 웹사이트에서 추가, 수정, 삭제할 수 있습니다. 미스키 페이지와 json 형식을 아예 처음 들어본 분들도 작업하실 수 있습니다.
  * ~~기본정보~~ ~~캐릭터~~ 지역 테마송
- [x] **메인 페이지**: 메인 페이지 상에 10x10으로 구획된 지도와 분류에 따른 캐릭터 목록을 출력합니다.
- [x] **서브 페이지**: 월드 내의 각 지역 페이지, 각 캐릭터 페이지, 기본적인 세계관 소개 페이지와 작품 페이지를 제공합니다.
- [x] **연도 범위 지정**: 
  * **startYear**: 작품에서 가장 중요한 해입니다. 일반적으로 작품의 시작 지점입니다.
  * **yearRange**: 전체 연도 범위입니다.
  * **mainYear**: 작중에서 중점적으로 다루어지는, 많은 사건이 일어나는 해입니다. 여러 개 지정할 수 있으며, 떨어져 있는 해를 지정할 수 있습니다. 
- [x] **연도별 지도 변화**: 연도별 지역 변화를 볼 수 있습니다.
- [x] **연도별 캐릭터 변화**: 연도별 캐릭터 생존 현황을 확인할 수 있습니다.
- [x] **모바일 화면 지원**: 모바일 화면을 지원합니다.

### 월드 관련 기능

- [x] **지도 배경 지정**: 지도 상에 배경이미지를 지정하여, 지도의 각 구획마다 어떤 특징적인 지역가 존재하는지 표시할 수 있습니다.
- [x] **지역 개별 문서**:지도 상의 각 위치마다 문서를 생성하고 정보를 기록할 수 있습니다. 즉 최대 100개 지역에 대한 데이터를 넣을 수 있습니다.
- [x] **지역 연표**: 지역의 연표를 만들고 출력할 수 있습니다.
- [x] **캐릭터를 지역에 연결**: 지도상의 어떤 지역와 캐릭터들 사이를 관계로 연결시킬 수 있습니다. 관계는 분류처럼 작용합니다.

### 캐릭터 관련 기능

- [x] **캐릭터 분류**: 캐릭터들의 분류와 하위 분류를 설정할 수 있습니다.
- [x] **캐릭터 연표**: 캐릭터의 연표를 만들고 출력할 수 있습니다.
  * 작중 캐릭터의 포지션 변화와 작중에서 일어나는 사건을 나누어 담을 수 있습니다.
  * 캐릭터의 연표 상 Main Year에 해당하는 연도는 연 단위가 아닌 월 단위로 나타나고, 접기 버튼을 눌러도 접히지 않습니다.
- [x] **캐릭터끼리 연결**: 어떤 캐릭터와 다른 캐릭터들 사이를 관계로 연결시킬 수 있습니다. 관계는 분류처럼 작용합니다.
  * 일방적으로 적용할 수 있어서, 'A는 B를 친구로 생각하지만 B는 A를 친구로 생각하지 않는 상황' 같은 것을 만들 수 있습니다.
- [x] **캐릭터 테마곡**: 캐릭터의 테마곡을 지정할 수 있고, 유튜브나 사운드클라우드에 게시된 미디어가 임베딩된 문서를 따로 만들 수 있습니다.

### 작품 관련 기능

- [x] **Misskey 노트 조회**: 각 작품은 Misskey 상에 올라와 있는 노트에 대응되며, 노트를 페이지처럼 조회할 수 있습니다.
- [x] **해시태그로 노트 조회**: 작품의 메인 해시태그를 지정하여, 메인 해시태그를 달고 있는 작품을 모아 볼 수 있습니다.
- [x] **작품의 구분**: '완성작'과 '드래프트'를 분리할 수 있습니다. 
  * 정확히는, '완성작'은 완성된 작품으로서 작품 페이지에서, '드래프트'는 완성되지 않은 초안이자 다듬어지지 않은 설정문서로서 캐릭터나 월드 페이지에서 확인할 수 있습니다.
  * 물론 사용하기에 따라 '드래프트' 에 각종 소소한 설정들을 집어넣을 수도 있답니다.
- [x] **마크다운 지원**: MFM이 아닌 본격적인 마크다운을 지원합니다. (MFM은 지원하지 않습니다).
- [x] **작품에 대한 반응**: Misskey에서 받은 리액션과 답멘션이 반응과 덧글처럼 나타납니다.
- [x] **해시태그 분류**: 작품을 해시태그로 분류해서 시리즈별, 캐릭터별로 조회할 수 있습니다.
- [x] **오래된 작품 보기**: 미스키 API에서 제공하는 100개 제한보다 더 많은 작품을 불러올 수 있습니다.
- [ ] **편리한 내용 편집**: 작품들은 미스키 클라이언트가 아닌 캐비닛키 웹사이트에서 추가, 수정, 삭제할 수 있습니다.
- [ ] **수정 기능**: 내용을 수정할 수는 없지만, 수정사항이 있는 경우 삭제 후 재투고하게 되고, 이 경우 글은 다시 타임라인 위쪽으로 올라가게 됩니다.

## 초기 설정

* 깃허브 아이디를 생성하고, [CabinetKey 레포지토리](https://github.com/jyhyun1008/CabinetKey/)를 포크하세요.
* 자작 세계관 구상용으로 사용을 원하시는 Misskey 계정을 생성하세요. v13 이상의 Misskey 인스턴스에서 이상적으로 동작합니다.
* settings.js 를 수정하여 Misskey 계정 정보 및 CabinetKey의 테마 등을 등록하세요.
* [로그인](./?page=signin)하세요. 초기 로그인 시 셋업 노트와 json 페이지가 만들어집니다.
  * Misskey Page가 어디 존재하는지는 별로 중요한 사항은 아닙니다. CabinetKey에서 편집할 수 있으니까요!
* 각 페이지의 편집 메뉴에서 세계관과 캐릭터를 편집하고, 작품도 업로드해 보세요. 물론 [json 데이터를 직접 편집](./?mode=edit)할 수도 있답니다!
