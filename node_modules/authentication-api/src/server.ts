import env from '@/config/env';
import ds from '@/db/DataSource';
import app from './app';

app.listen(env.PORT, () => {
    ds.getMysqlDataSource();
    ds.getPostgresDataSource();

    console.log(`Servidor rodando na porta ${env.PORT}`);
})