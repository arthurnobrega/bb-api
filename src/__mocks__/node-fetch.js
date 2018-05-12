export default function fetch(url, { method, body }) {
  let textResponse = ''

  switch (true) {
    case /mov-centralizador\/hash/i.test(url):
      textResponse = '3e318fb1a00a88348d65d1b7e79f6d25aefdff0d2481255f685a20dd3960ba43421bbfa3ec97c3c0'
      break
    case /servico\/ServicoLogin\/login/.test(url):
      textResponse = `{"login": {
        "mci": "919581131",
        "nomeCliente": "João Paulo Alcântara",
        "titularidade": 1,
        "dependenciaOrigem": "1234-0",
        "numeroContratoOrigem": "12345-6",
        "segmento": "EXCLUSIVO_REMOTO",
        "imagemCliente": "/9j/4AAQSkoJRgABAQAAAQABAAD/1wBDAAYEBQxYBAYGBQYHBxIChAKCgkJChpODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABkAGQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDn5AqDjKuykYbHA55p0ABQOVPzfLjdkY9hTJCRONjbgepyCP8APWpd8SqAIgPlyML25/Sq6nMHLSbWY9cgg8CglW3Bjz06duKaWBba2MMeRnnsKQAoTk49SP6GmgsNJIUYIwew61C+ee45xtbp9abPOkMLSMSq8ZGc8jtWQ+oNIxYDYD24yfrSbNEjUbJJz90cfWr1hfNGRHLkrngntXLSX8oGQ2Mnknj9Ki/tOZVBUrIB1B4IqoVHTd0EoJ6M9DWXPeneZ71xmk+IEeUQyhlz0zXRpcBhwcg16VOuqiOaVOxfL570nmY71U83P1pDIfWteYnlLfm/Siqe+ipuHKVS6/aFMqgq2B06Djmn7I8Fd4O5tuB8uB7VD5jI2EZkZicDv1/rVjIR1EhXdkHPU+vrxXkJm2wwjcyphd4HcZb/AD1qpeTw2ynewXkcHnPHT9auImwEgPt9c9PTvXOa073V48cROyMZIU5yaTNIq5majfSXU3DbIl6KD0FIg8xBsO/2Jz/WvRYvhFrM+i217bvHJNIm94N2CoPoTwTU+k/CLX7jcZITCB18w5/LFJSR0qjI8udMfejkX6DiqkjxpuEZZT6MK9du/hpeWwdZkbPqprn9Q8BOFJwQR1qHURr9Wla55yZvnDj7ynP411Wg6yZgUlG1hzgdMVV1rw09ovmRhiByRXN2t69req2OAcHtx6VUJ2d0c9Sm46M9RSUMMg8Gnb+Kw7W6wgYfcIzitBJw4yDXoU6yktTmlGxc30VWElFacxPKSwIxZwqy7+gxx+PtT/mTYjMxHUt6jGePyqT5wu1fukZU9j1pD8yuBIhzwTn7vGDivLRYSlgyojY2Akg4ORgenesPw7avfeK7axUFnubsI2B/Du5P4cmt304jZSchsc/gR/npW58K/D0zfEa3uZ7d1RIWu4y643A/KCMjnls59qHLS5tSV3Y9+tbuGwiWMoxCAKAo61Rk8e2FrefZ7yxv4OmH8sOpz/ukn9KTxFZX3l/6I6rjjBJGc9zjn8iPqK80nt/El1qhjv4LUW8JxDJDIdz8/wC057ZzmimlY7GuZ6nss19ZTxrMGVkPXI/oa4fxLqWhyyPA11aQy5xhnVTVPxNpU1n4J1CWZp4riJi0TpcyHJHAbG7GDj7pB+hrykTW0YW611pUieTYpEG4ZHJycj1HQHNHJzMty9mlY3PFthHbxlhteNujDkEV4p4htIk1STZ8q8YHvXqepahBPbSRabnyscqTuH4ZGRXmPiNWfU2AzubB/pUqHK9DKtU54q6NOxBFnCT02D+VTJK0b5HT0pIo/KhSP+4oXnvxTT3ORVJ22OXc0EnBXOaKyyDk4NFa+2ZHKdeWJmy28xbcDHBz7ZH+FNlZmKLKYw2AcEcZPrTkDLC0pbdkcsVOWHQfT1//AFU1t0r78gYzuU9Qf8/yrKxmhq7EXCNtfucEflzXvnguxhtrnTZIWkaGa2eWJZHyUVijbfyK59814LHOPLyxUshwxJ4IyTXsnwgvmvbe3iIGLKJo87iS25g3f8vwqJrS52YaW6PV2t42GSoJqCWCNeUjUP2OOaeZiVOwciszWrO7u9MeLTtQa1unPMyAMQO+M0RaaNoJ31ZQ8e2SXHhS6hDqrFCATXl2h+HoL/S0cPIu5f4TwPwpPiO+vWulixF3K9tHiP7QVG529TxjPPpirHw71CT7JIkoxySAKG7bHZGFo2vcyNR8LW+mxzvnduGc5x+dePXdp9q12Wck+TGQMe4Gf/r17B8QNTYPIsZwCuTivMrdlFqSFG5yST+PX8hSTbZzVoRS1KzZ7j8Kib9akcnaAelQsxBJHTNaWOEYSM8/zophbnk4/GilYR2kgYZbBLFerDkY6ZB/ziq8kS4UQue54HJyO34Y5q2zs8oyMMfm2seWH19eKqhJV8xWkUMPmIU/d/H8unrTOeLGbkjXGdw5UKVxg969Q+BF6Bq9/azSfM8aui7uDgkEgfiv6V5ZIWXywzEtk9Rk9u34Vc8NeKovD/iq1kRszMfLlUc4U9j75AOPwpSV1Y6KTtI+otdtrqbSbi209xHdSDarn+HPf8KxNDXxEluYNVu7SC5Q7QtvAXTGeuSQTxW74e1a31a0jngkV8r2NXb+3eaFhEwSTs2OlKk0t0dynbRnm3jxNYGmuFu7S5i2FmjFs3zHIHbp1/SvO/Ad1e3V7fhrWSCGJN7FlIUEemee9eneJLPUZ4XhuXURg8bRyfxz/SuMkuE8PaLeQqB5s/yjNVV5XsdF7JanH+Kiz6dqF9J91ZPKUH1Ayf51xiApAidCFANafibV/tK22lwPmONvMkPXnqazHyfQ1EFZHFianNKyGPz16c81WfqRg/Wp3GF46d6rnJXp1NVc5iM/TPvRS4yTRQI7iZwz+Y2wqXYFgOuAf15quSjRMzhA55P90Ac1B4oum0/R3mh8uR92wHHygcDOD3+n/wBevPry+nuA0t1NI5z93dx0rRRvqcyN/WdbMTm2sZMu33ps5Az6e/X/AD0X4XWceo/EPSrSUuUlaTcwPzcRsf6VyMM37xQFAUHdj6V3nwRQt8RbCUDhA3PpkEUptKOh0U17x6Te6hrHwx10Id0+mTHKZJIx6fWux0z4y6XcWytO5ic8FGHI/Ku38U6Bba3pRhuYUlRl5Br548UfDCfT5LiWzuSkSfN5bjJA+tQpJ6s6E30O48TfEyymwLZ9w5JYjHH0ryPxR4ul1W4CQkn0x3rIuNGu2JU3BYdyans9KWxQs2S56k0m0i3OT0OV1G6uLLUI3WQlyNz56Nz0PtXS2dwlzbpKowG7ehrm9VQXGqv6KAK0tCbYJIT25HH+fb8qtRbjzHNOXvWNRgWxkdaiIO3B6VMckDFRnFRcRASB1op5zn5aKVwMS6u7i4WSOaeV0VchS2Rmk0+NbrU9PtZlzDNPEjgcZBYA/pRRXXLRMxRXu4UgmlVM4EjLz6A16X8B41HipJMDcBRRWNTY1pn17ZDzISr8jFcx40sIJrR0kUlSPWiiskaniWq6bbQzbI1IFcxrkaxqQo7ZooqHubdDz24AW/fHelWQwK8qY3qFIz+NFFd9k8Dhn8RvRsZIgWOOOg6VE3Cg46k/zoorjNBoGSc+tFFFSOx//k1=",
        "habilitadoParaAtendimentoRemoto": "true",
        "statusAutorizacaoTransacoesFinanceiras": "INICIALIZADO"
      }}`
      break
    case /servico\/ServicoSaldo\/saldo/.test(url):
      textResponse = `{"servicoSaldo": {
          "saldo": "20.345,78 C"
        }}`
      break
    default:
  }

  return {
    text: () => Promise.resolve(textResponse),
    headers: {
      get: () => {},
    },
  }
}
