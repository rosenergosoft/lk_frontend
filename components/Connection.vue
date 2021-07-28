<template>
  <div class="connection">
    <div class="page-title d-flex">
      <div class="active">
        Технологическое подключение
      </div>
      <div class="l-separator">/</div>
      <div><a href="">Обращения</a></div>
    </div>
    <div class="row justify-content-between funnel align-middle">
      <div class="col status-1 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            10
          </div>
          <div class="status-text">
            На рассмотрении
          </div>
        </div>
      </div>
      <div class="col status-2 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            3
          </div>
          <div class="status-text">
            Заявка аннулирована
          </div>
        </div>
      </div>
      <div class="col status-3 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            1
          </div>
          <div class="status-text">
            Подготовка тех условий
          </div>
        </div>
      </div>
      <div class="col status-4 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            7
          </div>
          <div class="status-text">
            Счет на оплату
          </div>
        </div>
      </div>
      <div class="col status-5 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            2
          </div>
          <div class="status-text">
            Исполняется
          </div>
        </div>
      </div>
      <div class="col status-6 status d-flex align-items-center justify-content-center">
        <div>
          <div class="count">
            3
          </div>
          <div class="status-text">
            Договор расторгнут
          </div>
        </div>
      </div>
    </div>
    <div class="filters d-flex">
      <div class="">
        <div class="select-wrapper">
          <select>
            <option>Статус заявки</option>
            <option>Черновики</option>
            <option>В работе</option>
            <option>Ожидает ответа компании</option>
            <option>Выполнены</option>
            <option>Отклонены</option>
            <option>Все заявки</option>
          </select>
        </div>
      </div>
      <div class="">
        <div class="search-wrapper">
          <input type="text" placeholder="Поиск"/>
        </div>
      </div>
    </div>
    <div class="table">
      <table class="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Участники</th>
            <th>Тип заявки</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              1
            </td>
            <td>
              <div>
                <strong>От:</strong> Иванов Петр Васильевич
              </div>
              <div>
                <strong>Кому:</strong> "ООО Росэлектросеть"
              </div>
            </td>
            <td>
              <div>Технологическое присоединение</div>
              <div>Тульская обл, Щекинский р-н с, Карамышево ул. Южная д,1 ряд 2, гараж №5</div>
              <div>Постоянное подключение, Изменение точки присоединения, 0.22 кВ</div>
              <div>26 июля 2021 г.: Заявка обновлена.</div>
            </td>
            <td>
              <div>Ожидает ответа компании</div>
            </td>
            <td>
              <div>26 июля 2021 г.</div>
            </td>
            <td></td>
          </tr>
          <tr class="odd">
            <td>
              1
            </td>
            <td>
              <div>
                <strong>От:</strong> Иванов Петр Васильевич
              </div>
              <div>
                <strong>Кому:</strong> "ООО Росэлектросеть"
              </div>
            </td>
            <td>
              <div>Технологическое присоединение</div>
              <div>Тульская обл, Щекинский р-н с, Карамышево ул. Южная д,1 ряд 2, гараж №5</div>
              <div>Постоянное подключение, Изменение точки присоединения, 0.22 кВ</div>
              <div>26 июля 2021 г.: Заявка обновлена.</div>
            </td>
            <td>
              <div>Ожидает ответа компании</div>
            </td>
            <td>
              <div>26 июля 2021 г.</div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Connection',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>

</style>
