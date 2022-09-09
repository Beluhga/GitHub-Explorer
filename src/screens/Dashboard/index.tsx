import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { Background } from '../../components/Background';
import { Card } from '../../components/Card';

import { useRepositories } from '../../hooks/useRepositories';

import {
  Container,
  AddGithubRepo,
  Title,
  Input,
  InputField,
  InputButton,
  Icon,
  RepositoriesList
} from './styles';

type RootStackParamList = {
  Dashboard: undefined;
  Repository: {
    repositoryId: number;
  }
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export function Dashboard() {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const { navigate } = useNavigation<NavigationProps>();

  const { addRepository, repositories } = useRepositories();

  function handleAddRepository() {
    /**
     * TODO: 
     * - call addRepository function sending inputText value;
     * - clean inputText value.
     */
    addRepository(inputText);
    setInputText("");

    inputRef.current?.blur();
  }

  function handleRepositoryPageNavigation(id: number) {
    /**
     * TODO - navigate to the Repository screen sending repository id.
     * Remember to use the correct prop name (repositoryId) to the repositoy id:
     * 
     * navigate(SCREEN NAME, {
     *  repositoryId: id of the repository
     * })
     */

    navigate("Repository", {
      repositoryId: id,
    })
  }

  return (
    <Background>
      <Container>
        <AddGithubRepo>
          <Title>Explore repositórios{'\n'}no GitHub.</Title>

          <Input>
            <InputField
              ref={inputRef}
              placeholder="Digite aqui 'usuário/repositório'"
              value={inputText}
              /**
               * TODO - update inputText value when input text value 
               * changes:
               * onChangeText={YOUR CODE HERE}
               */
              onChangeText={setInputText}
              onSubmitEditing={handleAddRepository}
              returnKeyType="send"
              autoCapitalize='none'
              autoCorrect={false}
            />

            <InputButton
              testID="input-button"
              onPress={handleAddRepository}
              /**
               * TODO - ensure to disable button when inputText is 
               * empty (use disabled prop to this):
               * disabled={CONDITION HERE}
               */
              disabled={!inputText}
              
            >
              <Icon name="search" size={20} />
            </InputButton>
          </Input>
        </AddGithubRepo>

        <RepositoriesList
          data={repositories}
          showsVerticalScrollIndicator={false}
          keyExtractor={repository => String(repository.id)}
          renderItem={({ item: repository }) => (
            <Card
              key={repository.id}
              data={{
                id: repository.id,
                title: repository.full_name,
                subTitle: repository.description,
                imageUrl: repository.owner.avatar_url
              }}
              onPress={() => handleRepositoryPageNavigation(repository.id)}
            />
          )}
        />
      </Container>
    </Background>
  )
}

/*
Essa é a primeira tela da aplicação. Ela será responsável pela busca de repositórios no GitHub e listagem dos repositórios encontrados.

Aqui você usará um hook `useRepositories` feito para fazer as requisições necessárias e gerenciar os dados dos repositórios. Não será necessário modificar nada no contexto ou no hook.

O hook retorna quatro informações mas listaremos aqui as que serão usadas na screen `Dashboard`:

- `addRepository`: Uma função que recebe o nome de um repositório no formato `user/repo-name` e busca as informações do repositório e das issues abertas na API do GitHub.
- `repositories`: A lista de repositórios que foram adicionados com o uso da função mencionada acima.

A seguir estarão listados os trechos que possuem comentários e que devem ser completados:

- **TODO - ensure to disable button when inputText is empty (use disabled prop to this)**
    
    Você deve desabilitar o botão de busca quando o input de texto estiver vazio. Para isso, você pode usar a propriedade `disabled` que recebe uma condição (verdadeiro ou falso) que indica quando o botão está habilitado ou não.
    
    **Dica:** A condição deve ser feita com base no estado `inputText`. 
    
    ---
    
- **TODO - update inputText value when input text value changes**
    
    O input de texto deve atualizar o estado `inputText` a cada vez que uma letra for digitada (ou apagada).
    
    ---
    
- **TODO:**
    
    **- call addRepository function sending inputText value;**
    
    **- clean inputText value.**
    
    Na função `handleAddRepository` você deve chamar a função `[addRepository](https://www.notion.so/Desafio-01-GitHub-Explorer-c3beaf2ffe5346f18abc4869b0947c8a)` passando o nome do repositório que está no estado. Caso o nome seja válido, isso vai fazer com que o estado `repositories` do hook `useRepositories` seja atualizado com as informações do repositório buscado. Caso contrário, um alerta será mostrado em tela.
    
    Além disso, será necessário limpar o valor do input após a busca ser feita.
    
    ---
    
- **TODO - navigate to the Repository screen sending repository id. Remember to use the correct prop name (repositoryId) to the repositoy id.**
    
    Na função `handleRepositoryPageNavigation`, você deve fazer a navegação do usuário para a tela `Repository` enviando também o id do repositório em uma propriedade chamada `repositoryId`. Lembre-se de usar esse exato nome, pois isso será usado para recuperar o valor na próxima tela. 
    
    Essa navegação deverá acontecer ao clicar no card de algum repositório listado.
 */