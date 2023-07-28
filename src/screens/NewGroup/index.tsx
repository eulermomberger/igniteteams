import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';

import { groupCreate } from '@storage/group/groupCreate';

import { AppError } from '@utils/AppError';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        Alert.alert('Nova turma', 'Informe o nome da turma');
      }

      await groupCreate(group);

      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova turma', error.message);
      } else {
        Alert.alert('Nova turma', 'Não foi possível criar uma nova turma!');
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title='Nova turma'
          subtitle='crie a turma para adicionar as pessoas'
        />

        <Input
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />

        <Button
          title='Criar'
          onPress={handleNew}
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
