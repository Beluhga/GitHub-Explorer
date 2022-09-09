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
A tela Repository é onde as informações mais detalhadas do repositório serão mostradas.

Para que isso seja possível, o id do repositório é recuperado dos parâmetros de navegação e usado como argumento para a função `findRepositoryById` do hook `useRepositories`. Essa função recebe o id de um repositório e retorna todas as informações desse repositório que estão armazenadas no contexto: 

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

O primeiro passo aqui é colocar corretamente as informações do repositório em todos os lugares que possui comentários dentro do componente para que tudo seja exibido corretamente.

Após isso, você precisa completar mais alguns trechos que também estão comentados:

- **TODO - onPress prop calling**
    
    No componente `Card`, dentro do componente `IssuesList`, você precisa chamar a função `handleIssueNavigation` no onPress passando a URL da issue (`issue.html_url`).
    
- **TODO - use Linking to open issueUrl in a browser**
    
    Dentro da função `handleIssueNavigation` você precisa abrir o navegador padrão do dispositivo com o link da issue recebido como argumento. Para isso, o React Native nos dá o **[Linking](https://reactnative.dev/docs/linking)** (que já está importado para você).
    Com ele, é possível usar o método `openURL` passando como argumento, a URL a ser aberta. Exemplo: `Linking.openURL('http://minha-url-aqui.com')`.
 */