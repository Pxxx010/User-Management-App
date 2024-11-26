
# User Management App

Este é um aplicativo React Native para gerenciar usuários. Ele inclui funcionalidades como listar usuários, adicionar novos usuários e exportar listas para o WhatsApp.

## Funcionalidades
- **Listagem de Usuários**: Exibe uma lista de usuários com suas informações básicas.
- **Cadastro de Usuários**: Permite adicionar um novo usuário com foto.
- **Exportar para WhatsApp**: Exporta a lista de usuários em um formato legível para compartilhamento no WhatsApp.
- **Atualizar Dados**: Atualiza a lista de usuários com um único clique.

## Tecnologias Utilizadas
- **React Native**: Framework principal.
- **React Native Paper**: Para componentes visuais como FAB e menus.
- **Expo Image Picker**: Para selecionar ou tirar fotos.
- **Faker.js**: Gera dados aleatórios para preenchimento automático.
- **WhatsApp Linking**: Compartilhamento direto para o WhatsApp.

## Estrutura de Arquivos
Abaixo está a estrutura do projeto:

```
MiniApp/
├── .expo/                 # Arquivos de configuração do Expo
├── assets/                # Imagens e recursos estáticos
├── navigation/
│   └── Navigation.js      # Configuração de navegação do app
├── screens/               # Telas principais do aplicativo
│   ├── CreateUserScreen.js  # Tela para criar novos usuários
│   └── ListUsersScreen.js   # Tela para listar usuários
├── services/
│   └── api.js             # Serviço para chamadas à API
├── .gitignore             # Arquivo para ignorar arquivos desnecessários no Git
├── App.js                 # Arquivo principal do React Native
├── app.json               # Configurações do Expo
├── index.js               # Arquivo de entrada principal
├── package.json           # Dependências e scripts do projeto
├── package-lock.json      # Arquivo de controle de dependências
├── readme.md              # Documentação do projeto
└── yarn.lock              # Arquivo de controle de dependências do Yarn
```

## Como Executar o Projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/user-management-app.git
   cd user-management-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   expo start
   ```

4. Abra o aplicativo no emulador ou em um dispositivo físico via Expo Go.

## Pré-requisitos
- Node.js instalado
- Expo CLI instalado (`npm install -g expo-cli`)
- Aplicativo Expo Go instalado no dispositivo (para testes em dispositivos reais)

## Telas
### 1. Listar Usuários
- Mostra uma lista de usuários.
- Permite ver detalhes ao tocar em um usuário.
- Inclui opções para atualizar a lista e exportar para o WhatsApp.

### 2. Criar Usuário
- Formulário para adicionar um novo usuário.
- Suporte a foto de perfil via câmera ou galeria.
- Valida todos os campos antes de cadastrar.

## Como Contribuir
1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-nova-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório:
   ```bash
   git push origin minha-nova-feature
   ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido com ❤️ por [Seu Nome].
