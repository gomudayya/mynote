# 내가 쓰려고 만든 메모 어플

나는 갤럭시를 사용하고 있는데, 갤럭시에서 기본 지원하는 삼성노트는 내 핸드폰에서 사용하기에 꽤 느렸다.

내가 옛날 폰을 사용하고 있기도하고, 잡다한 기능이 많다 보니 내 폰에서는 속도가 답답할정도로 느렸다.

그러다 보니 급하게 메모할일이 있으면 그냥 카카오톡 내게쓰기를 사용하면서 메모를 했는데, 이 모습에 조금 현타가 와서 만들게 됐다.

만들고 나니 꽤 편하고, 내가 만들어서 그런지 쓰기도 편하다. 앞으로도 나의 생활에 필요한 비슷한 앱을 많이 만들 것 같다.

쓰면서 필요에 따라 추가기능을 더 넣거나 커스텀 하겠지만 나는 미니멀한 컨셉을 더 선호해서 그냥 둘 것 같긴하다. 

메모가 많이 쌓이면 백업 기능 정도 생각중이다.

## 삽질한 것

### 드래그 드랍 기능 넣기

메모 목록의 순서를 변경할 수 있는 기능을 만드려고 했는데, Drag-Drop을 이용하는 것이 가장 사용감이 좋을거라고 생각했다.

결론적으로 [DraggableFlatList](https://github.com/computerjazz/react-native-draggable-flatlist) 라이브러리를 사용했는데, 사용하면서 아쉬운점이 좀 있었다.

DraggableFlatList 컴포넌트에는 onDragEnd prop이 있는데, Drag-Drop 완료되면 setState()를 통해 순서가 바뀐것을 반영해주는 식이다.

아쉬운 점은 setState()를 호출하기 때문에 컴포넌트 함수가 재실행되고 리렌더링이 발생하는 찰나의 순간이 사용자에게 보여지는 점이다. (Ios에선 괜찮다는 것 같기도)

이게 조금 거슬려서, 직접 reanimated를 이용해서 드래그 드랍을 구현해보고 적용하려고 했다. ([관련 저장소](https://github.com/gomudayya/react-native-drag-drop-animation))

그런데 또 사용하다보니 별 불편함이 없어서 그냥 쓰기로 했다. ㅎㅎ;

구현 시간도 오래걸릴 것 같고, 난점이였던 것은 ScrollView로 구현하면 문제는 없었는데, 

FlatList안의 Item을 Position: 'absolute'로 지정할 경우 Item의 숫자가 150개가 넘어가면 중간에 Item이 사라지는 문제가 있었다.

아마 FlatList의 VirtualVisualization이 Position: 'absolute' 와 잘 호환이 안되는 것 같다.

좀 시도해보니, 왜 라이브러리 메인테이너가 onDragEnd prop에서 setState()를 호출하도록 설계했는지 알 것 같았다. 

Position: 'absolute'는 Flatlist와 잘 호환이 안되기 때문에 해당 라이브러리에선 'relative'를 사용했고,

드래그 드랍이 시작되면 `transform`을 통해서 임시적으로 `translateX`, `translateY` 만큼 이동시킨후에, setState()를 통해 영구적으로 이동시키는 방식을 선택했다.

보통 드래그 드랍 같은 경우에는 'absolute'를 사용해 구현하는 것이 매끄럽게 잘 된다. 하지만 FlatList 안에서 사용하려다보니 위의 방식을 선택한 것 같다.

### React.Memo 걸기

위의 문제때문에 차선책으로 Draggable-Flatlist 를 사용하되, 내부 Item에 대해서 React.Memo를 걸어주기로 했다.

React.Memo 는 컴포넌트를 메모이제이션해 prop이 변경되지 않는다면, 메모이제이션 된 컴포넌트를 그대로 사용하는 기능이다.

드래그되는 Item을 제외한 다른 모든 Item들이 Prop의 변경 없이 재렌더링이 발생하는 상황이였기 때문에 React.Memo를 사용하기 적합한 상황이었다.

그런데 이 Memo 기능이 잘 작동을 안하고, 컴포넌트가 계속 생성되길래 무슨 문제인가 봤더니 

React.Memo는 ShallowCopy를 기반으로 prop을 비교하고, 익명함수는 매번 참조값이 바뀌기 때문에 다른 prop으로 판단해서 컴포넌트를 계속 생성했다.

`onPress={() => handlePressItem(memo)}` 이런 구조였는데, 이런 경우처럼 인자가 있는 함수라면 처리하기가 좀 귀찮아진다. (캐싱해야함)

그래서 그냥 함수를 넘겨주는것이 아닌 memo를 넘겨주고 Item 컴포넌트 안에서 press 이벤트를 다루었다.

Memo가 확실히 걸리니까, 성능차이는 꽤 유의미했다. React Devtools profiler로 확인했는데 Render 시간이 꽤 차이가 났다.

<img width="300" height="281" alt="Memo 적용전" src="https://github.com/user-attachments/assets/3c1d1b75-47fb-4d92-aacc-e266c15aad23" />

<img width="306" height="227" alt="Memo 적용후" src="https://github.com/user-attachments/assets/5dd210d3-6a69-4e09-9394-c7ff0c91b7a2" />

Item 갯수를 100개정도 만들고 테스트했는데, 대략 이정도 차이가 났다. (전 : 224ms 후 :121ms)

Item을 100개까지 쓸진 잘 모르겠지만 ㅋㅋ.. 그래도 항목이 20~30개 넘어가면 충분히 체감할 정도의 사용감 차이인 것같다.
