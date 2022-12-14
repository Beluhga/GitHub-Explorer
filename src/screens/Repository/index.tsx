import React from 'react';
import { useRoute } from '@react-navigation/core';
import { Linking } from 'react-native';
import { useRepositories } from '../../hooks/useRepositories';

import { Background } from '../../components/Background';
import { Card } from '../../components/Card';

import {
  Container,
  RepoInfo,
  OwnerAvatar,
  TextGroup,
  Description,
  RepoStats,
  Stars,
  StarsCounter,
  StarsText,
  Forks,
  ForksCounter,
  ForksText,
  OpenIssues,
  OpenIssuesCounter,
  OpenIssuesText,
  IssuesList,
} from './styles';
import { TitleAnimation } from './TitleAnimation';

interface RepositoryParams {
  repositoryId: number;
}

export function Repository() {
  const { params } = useRoute();
  const { repositoryId } = params as RepositoryParams;
  const { findRepositoryById } = useRepositories();
  const repository = findRepositoryById(repositoryId);

  function handleIssueNavigation(issueUrl: string) {
    // TODO - use Linking to open issueUrl in a browser
    Linking.openURL(issueUrl);
  }

  return (
    <Background>
      <Container>
        <RepoInfo>
          {/* <OwnerAvatar source={{ uri:  }} /> */}
          <OwnerAvatar source={{uri: repository.owner.avatar_url}} />

          <TextGroup>
            <TitleAnimation>
              {
                // TODO - full name of the repository
                repository.full_name
              }
            </TitleAnimation>

            <Description numberOfLines={2}>{
              //TODO - repository description
              repository.description
            }</Description>
          </TextGroup>
        </RepoInfo>

        <RepoStats>
          <Stars>
            <StarsCounter>
              {
              // TODO - repository stargazers count
              repository.stargazers_count
              }
            </StarsCounter>
            <StarsText>Stars</StarsText>
          </Stars>

          <Forks>
            <ForksCounter>
              {
              // TODO - repository forks count
              repository.forks_count
              }
            </ForksCounter>
            <ForksText>Forks</ForksText>
          </Forks>

          <OpenIssues>
            <OpenIssuesCounter>
              {
              // TODO - repository issues count
              repository.issues.length
              }
            </OpenIssuesCounter>
            <OpenIssuesText>Issues{'\n'}Abertas</OpenIssuesText>
          </OpenIssues>
        </RepoStats>

        <IssuesList
          data={repository.issues}
          keyExtractor={issue => String(issue.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: issue }) => (
            <Card
              data={{
                id: issue.id,
                title: issue.title,
                subTitle: issue.user.login,
              }}
              // TODO - onPress prop calling
              onPress={() => handleIssueNavigation(issue.html_url)}
            />
          )}
        />
      </Container>
    </Background>
  )
}

/*
A tela Repository ?? onde as informa????es mais detalhadas do reposit??rio ser??o mostradas.

Para que isso seja poss??vel, o id do reposit??rio ?? recuperado dos par??metros de navega????o e usado como argumento para a fun????o `findRepositoryById` do hook `useRepositories`. Essa fun????o recebe o id de um reposit??rio e retorna todas as informa????es desse reposit??rio que est??o armazenadas no contexto: 

```tsx
{
  id: number,
  full_name: string;
  owner: {
    avatar_url: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  issues_url: string;

  issues: Array<{
	  id: number;
	  title: string;
	  html_url: string;
	  user: {
	    login: string;
	  };
	}>
}
```

O primeiro passo aqui ?? colocar corretamente as informa????es do reposit??rio em todos os lugares que possui coment??rios dentro do componente para que tudo seja exibido corretamente.

Ap??s isso, voc?? precisa completar mais alguns trechos que tamb??m est??o comentados:

- **TODO - onPress prop calling**
    
    No componente `Card`, dentro do componente `IssuesList`, voc?? precisa chamar a fun????o `handleIssueNavigation` no onPress passando a URL da issue (`issue.html_url`).
    
- **TODO - use Linking to open issueUrl in a browser**
    
    Dentro da fun????o `handleIssueNavigation` voc?? precisa abrir o navegador padr??o do dispositivo com o link da issue recebido como argumento. Para isso, o React Native nos d?? o **[Linking](https://reactnative.dev/docs/linking)** (que j?? est?? importado para voc??).
    Com ele, ?? poss??vel usar o m??todo `openURL` passando como argumento, a URL a ser aberta. Exemplo: `Linking.openURL('http://minha-url-aqui.com')`.
 */